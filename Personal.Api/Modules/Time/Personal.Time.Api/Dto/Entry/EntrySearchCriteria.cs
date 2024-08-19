using Personal.Shared.Dtos;

namespace Personal.Time.Api.Dto.Entry
{
    public class EntrySearchCriteria : SearchCriteria
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }
}
