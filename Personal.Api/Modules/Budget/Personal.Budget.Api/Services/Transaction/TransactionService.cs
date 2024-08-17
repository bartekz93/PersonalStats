using Dapper;
using Personal.Budget.Api.Dto.Transaction;
using Personal.Budget.Api.Resources;
using Personal.Budget.Data;
using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Services.Transaction
{
    public class TransactionService : ITransactionService
    {
        private readonly BudgetContext budgetContext;

        public TransactionService(BudgetContext budgetContext)
        {
            this.budgetContext=budgetContext;
        }

        public async Task<int> Create(TransactionEdit dto, int userId)
        {
            var model = new Data.Models.Transaction
            {
                IsActive = true,
                UserId = userId,
                ModifyUserId = userId,
                CreateUserId = userId,
                Amount = dto.Amount,
                CategoryId = dto.CategoryId,
                Date = dto.Date,
                Note = dto.Description,
                WalletId = dto.WalletId
            };

            budgetContext.Transactions.Add(model);
            await budgetContext.SaveChangesAsync();

            return model.Id;
        }

        public async Task Delete(int id, int userId)
        {
            var model = budgetContext.Transactions.Where(x => x.Id == id).FirstOrDefault();
            model.IsActive = false;
            model.ModifyDate = DateTime.Now;
            model.ModifyUserId = userId;
            await budgetContext.SaveChangesAsync();
        }

        public async Task Edit(TransactionEdit dto, int userId)
        {
            var model = budgetContext.Transactions.Where(x => x.Id == dto.Id).FirstOrDefault();
            model.Note = dto.Description;
            model.Amount = dto.Amount;
            model.CategoryId = dto.CategoryId;
            model.WalletId = dto.WalletId;
            model.Date = dto.Date;
            model.ModifyDate = DateTime.Now;
            model.ModifyUserId = userId;
            await budgetContext.SaveChangesAsync();
        }

        public async Task<SearchResult<TransactionSearchItem>> Search(TransactionSearchCriteria criteria, int userId)
        {
            using (var connection = budgetContext.GetConnection())
            {
                var p = new DynamicParameters();
                p.Add("User_Id", userId);
                p.Add("Note", criteria.Description);
                p.Add("AmountMin", criteria.AmountMin);
                p.Add("AmountMax", criteria.AmountMax);
                p.Add("DateFrom", criteria.DateFrom);
                p.Add("DateTo", criteria.DateTo);
                p.Add("CategoryIds", criteria.CategoryIds);
                p.Add("WalletIds", criteria.WalletIds);
                p.Add("Offset", criteria.Offset);
                p.Add("Rows", criteria.Rows ?? int.MaxValue);

                var items = await connection.QueryAsync<TransactionSearchItem>(Sql.Transaction_Search, p);
                return new SearchResult<TransactionSearchItem>(items);
            }
        }
    }
}
