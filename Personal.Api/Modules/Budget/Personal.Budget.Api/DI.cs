using Personal.Budget.Api.Services.Category;
using Personal.Budget.Api.Services.Transaction;
using Personal.Budget.Api.Services.Wallet;
using Personal.Budget.Data;

namespace Personal.Budget
{
    public static class DI
    {
        public static void AddBudgetModule(this IServiceCollection services)
        {
            services.AddScoped<IWalletService, WalletService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddBudgetData();
        }
    }
}
