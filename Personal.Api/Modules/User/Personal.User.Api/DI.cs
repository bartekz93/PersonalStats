using Personal.User.Data;
using Personal.User.Services.User;

namespace Personal.User
{
    public static class DI
    {
        public static void AddUserModule(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddUserData();
        }
    }
}
