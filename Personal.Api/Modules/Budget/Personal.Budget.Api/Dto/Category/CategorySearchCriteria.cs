using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Dto.Category
{
    public class CategorySearchCriteria : SearchCriteria
    {
        public string Type { get; set; }
        public string Name { get; set; }
    }
}
