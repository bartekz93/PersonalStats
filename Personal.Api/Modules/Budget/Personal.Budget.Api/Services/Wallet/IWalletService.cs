using Personal.Budget.Api.Dto.Wallet;
using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Services.Wallet
{
    public interface IWalletService
    {
        Task<SearchResult<WalletSearchItem>> Search(WalletSearchCriteria criteria, int userId);
        Task Edit(WalletEdit dto, int userId);
        Task<int> Create(WalletEdit dto, int userId);
        Task Delete(int id, int userId);
    }
}
