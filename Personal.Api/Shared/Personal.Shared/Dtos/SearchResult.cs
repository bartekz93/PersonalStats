namespace Personal.Shared.Dtos
{
	public class SearchResult<T>
	{
		public IEnumerable<T> Rows { get; set; }
		public int TotalRows { get; set; }
	}
}
