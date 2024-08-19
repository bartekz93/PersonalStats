using Personal.Shared.Dtos;
using Personal.Time.Api.Dto.Entry;

namespace Personal.Time.Api.Services.Entry
{
    public interface IEntryService
    {
        Task<SearchResult<EntrySearchItem>> Search(EntrySearchCriteria criteria, int userId);
        Task Edit(EntryEdit dto, int userId);
        Task<int> Create(EntryEdit dto, int userId);
        Task Delete(int id, int userId);
    }
}
