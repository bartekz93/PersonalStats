using Personal.Shared.Dtos;

namespace Personal.Time.Api.Dto.Entry
{
    public class EntrySearchItem : SearchItem
    {
        public int Id { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public string Description { get; set; }
        public int ActivityId { get; set; }
        public string ActivityName { get; set; }
        public string ActivityColor { get; set; }
        public string ActivityIcon { get; set; }
    }
}
