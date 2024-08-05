namespace Personal.Shared.Dtos
{
	public class SearchCriteria
	{
		public int Offset { get; set; }
		public int Rows { get; set; }
		public string SortBy { get; set; }
		public int SortOrder { get; set; }
	}
}
