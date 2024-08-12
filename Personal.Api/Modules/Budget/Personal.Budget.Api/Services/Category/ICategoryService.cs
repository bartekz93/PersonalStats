using Personal.Budget.Api.Dto.Category;
using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Services.Category
{
    public interface ICategoryService
    {
        Task<SearchResult<CategorySearchItem>> Search(CategorySearchCriteria criteria, int userId);
        Task Edit(CategoryEdit dto, int userId);
        Task<int> Create(CategoryEdit dto, int userId);
        Task Delete(int id, int userId);
    }
}
