using Personal.Budget.Api.Dto;
using Personal.Budget.Data;
using Personal.Shared.Dtos;
using Dapper;
using Personal.Budget.Api.Resources;
using Personal.Budget.Data.Models;

namespace Personal.Budget.Api.Services
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
            var wallet = new Wallet()
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

        public async Task Edit(WalletEdit dto, int userId)
        {
            throw new NotImplementedException();
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
