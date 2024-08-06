using Microsoft.Extensions.DependencyInjection;

namespace Personal.User.Data
{
    public static class DI
    {
        public static void AddUserData(this IServiceCollection services)
        {
            services.AddDbContext<UserContext>();
        }
    }
}
