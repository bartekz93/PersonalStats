namespace Personal.Time.Api.Dto.Entry
{
    public class EntryEdit
    {
        public int Id { get; set; }
        public int ActivityId { get; set; }
        public string Description { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }
}
