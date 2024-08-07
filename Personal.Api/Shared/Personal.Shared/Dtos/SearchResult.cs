using System.Text.Json.Serialization;

namespace Personal.Shared.Dtos
{
    public class SearchItem
    {
        [JsonIgnore]
        public int TotalRows { get; set; }
    }

    public class SearchResult<T> where T : SearchItem
    {
        public IEnumerable<T> Rows { get; set; }
        public int TotalRows => Rows.Any() ? Rows.First().TotalRows : 0;

        public SearchResult(IEnumerable<T> rows)
        {
            Rows = rows;
        }
    }
}
