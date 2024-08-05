using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Personal.Shared.Exceptions;
using Personal.User.Data.Models;
using Personal.User.Dto;
using Personal.User.Services.User;
using System.Security.Claims;

namespace Personal.User.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("")]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok("asd");
        }

        [HttpGet("authenticated")]
        public IActionResult GetAuthenticatedUser()
        {
            var principal = HttpContext.User;
            if (principal != null && principal.Identity.IsAuthenticated)
            {
                var login = principal.Claims.Where(x => x.Type == ClaimTypes.Name).Select(x => x.Value).FirstOrDefault();
                return Ok(new
                {
                    Authenticated = true,
                    Login = login
                });
            }
            else
            {
                return Ok(new
                {
                    Authenticated = false,
                    Login = string.Empty
                });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            await userService.Register(dto);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            var jwtToken = await userService.Login(dto, ip);

            HttpContext.Response.Cookies.Append("AuthToken", jwtToken, new CookieOptions
            {
                Expires = DateTimeOffset.Now.AddMinutes(60)
            });

            return Ok();
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout(UserLoginDto dto)
        {
            HttpContext.Response.Cookies.Append("AuthToken", string.Empty, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now
            });

            return Ok();
        }
    }
}
