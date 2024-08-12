using Personal.Budget.Data;
using Personal.Shared.Dtos;
using Dapper;
using Personal.Budget.Api.Resources;
using Personal.Budget.Api.Dto.Wallet;

namespace Personal.Budget.Api.Services.Wallet
{
    public class WalletService : IWalletService
    {
        private readonly BudgetContext budgetContext;

        public WalletService(BudgetContext budgetContext)
        {
            this.budgetContext = budgetContext;
        }

        public async Task<int> Create(WalletEdit dto, int userId)
        {
            var wallet = new Data.Models.Wallet()
            {
                Color = dto.Color,
                Currency = dto.Currency,
                Name = dto.Name,
                UserId = userId,
                ModifyUserId = userId,
                CreateUserId = userId
            };

            budgetContext.Wallets.Add(wallet);
            await budgetContext.SaveChangesAsync();

            return wallet.Id;
        }

        public async Task Delete(int id, int userId)
        {
            var wallet = budgetContext.Wallets.Where(x => x.Id == id).FirstOrDefault();
            wallet.IsActive = false;
            wallet.ModifyDate = DateTime.Now;
            wallet.ModifyUserId = userId;
            await budgetContext.SaveChangesAsync();
        }

        public async Task Edit(WalletEdit dto, int userId)
        {
            var wallet = budgetContext.Wallets.Where(x => x.Id == dto.Id).FirstOrDefault();
            wallet.Color = dto.Color;
            wallet.Name = dto.Name;
            wallet.Currency = dto.Currency;
            wallet.ModifyDate = DateTime.Now;
            wallet.ModifyUserId = userId;
            await budgetContext.SaveChangesAsync();
        }

        public async Task<SearchResult<WalletSearchItem>> Search(WalletSearchCriteria criteria, int userId)
        {
            using (var connection = budgetContext.GetConnection())
            {
                var p = new DynamicParameters();
                p.Add("User_Id", userId);
                p.Add("Name", criteria.Name);
                p.Add("Currency", criteria.Currency);
                p.Add("Offset", criteria.Offset);
                p.Add("Rows", criteria.Rows);

                var items = await connection.QueryAsync<WalletSearchItem>(Sql.Wallet_Search, p);
                return new SearchResult<WalletSearchItem>(items);
            }
        }
    }
}
