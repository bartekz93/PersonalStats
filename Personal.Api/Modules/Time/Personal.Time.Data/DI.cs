using Microsoft.Extensions.DependencyInjection;

namespace Personal.Time.Data
{
    public static class DI
    {
        public static void AddTimeData(this IServiceCollection services)
        {
            services.AddDbContext<TimeContext>();
        }
    }
}
