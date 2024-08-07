using Microsoft.EntityFrameworkCore.Infrastructure;
using Personal.User.Dto;

namespace Personal.User.Services.User
{
    public interface IUserService
    {
        Task<string> Login(UserLoginDto dto, string ip);
        Task Register(UserRegisterDto dto);
    }
}
