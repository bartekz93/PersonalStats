using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Personal.Bootstraper.Middlewares;
using Personal.User;
using System.Text;

namespace Personal.Bootstraper
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false)
                .Build();

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddSwaggerGen();

            builder.Services.AddUserModule("");

            builder.Services.AddLogging(x => x.AddLog4Net("log4net.config"));

            builder.Services.AddCors();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = ctx =>
                    {
                        ctx.Token = ctx.Request.Cookies["AuthToken"];
                        return Task.CompletedTask;
                    }
                };
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "Personal",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["User:JwtSignKey"]))
                };
            });

            var app = builder.Build();

            app.UseAuthorization();
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors(x => x.WithOrigins("http://localhost:4200", "http://localhost:8080").AllowAnyMethod().AllowAnyHeader());

            app.MapControllers();

            app.UseMiddleware<ErrorHandlerMiddleware>();

            app.Run();
        }
    }
}
