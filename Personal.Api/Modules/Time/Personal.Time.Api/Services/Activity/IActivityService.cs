using Personal.Shared.Dtos;
using Personal.Time.Api.Dto.Activity;

namespace Personal.Time.Api.Services.Activity
{
    public interface IActivityService
    {
        Task<SearchResult<ActivitySearchItem>> Search(ActivitySearchCriteria criteria, int userId);
        Task Edit(ActivityEdit dto, int userId);
        Task<int> Create(ActivityEdit dto, int userId);
        Task Delete(int id, int userId);
    }
}
