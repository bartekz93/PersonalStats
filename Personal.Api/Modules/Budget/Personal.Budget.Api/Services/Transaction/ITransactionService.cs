using Personal.Budget.Api.Dto.Transaction;
using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Services.Transaction
{
    public interface ITransactionService
    {
        Task<SearchResult<TransactionSearchItem>> Search(TransactionSearchCriteria criteria, int userId);
        Task Edit(TransactionEdit dto, int userId);
        Task<int> Create(TransactionEdit dto, int userId);
        Task Delete(int id, int userId);
    }
}
