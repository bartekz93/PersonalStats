﻿using Personal.Budget.Api.Services.Wallet;
using Personal.Budget.Data;

namespace Personal.Budget
{
    public static class DI
    {
        public static void AddBudgetModule(this IServiceCollection services)
        {
            services.AddScoped<IWalletService, WalletService>();
            services.AddBudgetData();
        }
    }
}
