using Microsoft.IdentityModel.Tokens;
using Personal.Shared.Exceptions;
using Personal.User.Data;
using Personal.User.Dto;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.Intrinsics.Arm;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Personal.User.Services.User
{
    public class UserService : IUserService
    {
        private readonly UserContext userContext;
        private readonly string jwtSigningKey;

        public UserService(UserContext userContext, IConfiguration conf)
        {
            this.userContext = userContext;
            this.jwtSigningKey = conf["User:JwtSignKey"];
        }

        public async Task<string> Login(UserLoginDto dto, string ip)
        {
            if (string.IsNullOrEmpty(dto.Login))
            {
                throw BusinessException.WithMessage("user.errors.loginIsRequired");
            }

            if (string.IsNullOrEmpty(dto.Password))
            {
                throw BusinessException.WithMessage("user.errors.passwordIsRequired");
            }

            var user = userContext.Users.Where(x => x.IsActive && x.Login == dto.Login).FirstOrDefault();

            if (user == null) 
            {
                throw BusinessException.WithMessage("user.errors.invalidLoginOrPassword");
            }

            var isValidPassword = VerifyPassword(dto.Password, user.PasswordHash, user.PasswordSalt);

            if (!isValidPassword)
            {
                userContext.Logins.Add(new Data.Models.Login()
                {
                    UserId = user.Id,
                    Ip = ip,
                    IsSuccess = false
                });
                await userContext.SaveChangesAsync();

                throw BusinessException.WithMessage("user.errors.invalidLoginOrPassword");
            }

            userContext.Logins.Add(new Data.Models.Login()
            {
                UserId = user.Id,
                Ip = ip,
                IsSuccess = true
            });
            await userContext.SaveChangesAsync();

            return GenerateJwtToken(user.Login);
        }

        public async Task Register(UserRegisterDto dto)
        {
            if (string.IsNullOrEmpty(dto.Login))
            {
                throw BusinessException.WithMessage("user.errors.loginIsRequired");
            }

            if (string.IsNullOrEmpty(dto.Password))
            {
                throw BusinessException.WithMessage("user.errors.passwordIsRequired");
            }

            if (string.IsNullOrEmpty(dto.PasswordRepeat))
            {
                throw BusinessException.WithMessage("user.errors.passwordRepeatIsRequired");
            }

            if (dto.PasswordRepeat != dto.Password)
            {
                throw BusinessException.WithMessage("user.errors.passwordRepeatMismatch");
            }

            if (userContext.Users.Any(x => x.Login == dto.Login))
            {
                throw BusinessException.WithMessage("user.errors.loginAlreadyExists");
            }

            if (!ValidatePassword(dto.Password))
            {
                throw BusinessException.WithMessage("user.errors.passwordStrengthTooLow");
            }

            var salt = RandomNumberGenerator.GetBytes(16);
            var hash = HashPassword(dto.Password, salt);

            var user = new Data.Models.User()
            {
                Login = dto.Login,
                PasswordHash = hash,
                PasswordSalt = Convert.ToBase64String(salt)
            };

            userContext.Add(user);
            await userContext.SaveChangesAsync();
        }

        private string GenerateJwtToken(string login)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.jwtSigningKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = [
                new Claim(ClaimTypes.Name, login)
            ];

            var token = new JwtSecurityToken(
                issuer: "Personal",
                claims: claims,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool ValidatePassword(string password)
        {
            var validLength = password.Length >= 6;
            var hasUpperCase = new Regex("[A-Z]+").Match(password).Success;
            var hasLowerCase = new Regex("[a-z]+").Match(password).Success;
            var hasNumeric = new Regex("[0-9]+").Match(password).Success;
            var hasSpecial = new Regex("[!@#$%^&*()_+}{\":?><//}]+").Match(password).Success;

            return validLength && hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
        }

        private string HashPassword(string password, byte[] salt)
        {
            
            using (var sha256 = SHA256.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
                byte[] saltedPassword = new byte[passwordBytes.Length + salt.Length];

                // Concatenate password and salt
                Buffer.BlockCopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.Length);
                Buffer.BlockCopy(salt, 0, saltedPassword, passwordBytes.Length, salt.Length);

                // Hash the concatenated password and salt
                byte[] hashedBytes = sha256.ComputeHash(saltedPassword);

                // Concatenate the salt and hashed password for storage
                byte[] hashedPasswordWithSalt = new byte[hashedBytes.Length + salt.Length];
                Buffer.BlockCopy(salt, 0, hashedPasswordWithSalt, 0, salt.Length);
                Buffer.BlockCopy(hashedBytes, 0, hashedPasswordWithSalt, salt.Length, hashedBytes.Length);

                var passwordHash = Convert.ToBase64String(hashedPasswordWithSalt);
                return passwordHash;
            }
        }

        private bool VerifyPassword(string enteredPassword, string storedHash, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);
            var hashedPassword = HashPassword(enteredPassword, saltBytes);

            return hashedPassword == storedHash;
        }
    }
}
