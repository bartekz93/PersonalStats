using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Dto.Transaction
{
    public class TransactionSearchCriteria : SearchCriteria
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public decimal? AmountMin { get; set; }
        public decimal? AmountMax { get; set; }
        public string CategoryIds { get; set; }
        public string WalletIds { get; set; }
        public string Description { get; set; }
    }
}
