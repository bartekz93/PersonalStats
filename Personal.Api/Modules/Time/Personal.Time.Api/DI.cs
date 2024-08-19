using Personal.Time.Api.Services.Activity;
using Personal.Time.Api.Services.Entry;
using Personal.Time.Data;

namespace Personal.Time.Api
{
    public static class DI
    {
        public static void AddTimeModule(this IServiceCollection services)
        {
            services.AddScoped<IActivityService, ActivityService>();
            services.AddScoped<IEntryService, EntryService>();
            services.AddTimeData();
        }
    }
}
