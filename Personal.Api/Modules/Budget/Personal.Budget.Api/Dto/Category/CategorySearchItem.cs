using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Dto.Category
{
    public class CategorySearchItem : SearchItem
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Icon { get; set; }
    }
}
