using Microsoft.Extensions.DependencyInjection;

namespace Personal.Budget.Data
{
    public static class DI
    {
        public static void AddBudgetData(this IServiceCollection services)
        {
            services.AddDbContext<BudgetContext>();
        }
    }
}
