using Personal.Shared.Dtos;

namespace Personal.Time.Api.Dto.Activity
{
    public class ActivitySearchItem : SearchItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Icon { get; set; }
    }
}
