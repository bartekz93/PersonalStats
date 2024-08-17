using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Dto.Transaction
{
    public class TransactionSearchItem : SearchItem
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryColor { get; set; }
        public string CategoryIcon { get; set; }
        public int WalletId { get; set; }
        public string WalletName { get; set; }
        public string WalletColor { get; set; }
        public string WalletCurrency { get; set; }
        public decimal Balance { get; set; }
        public decimal FullIncome { get; set; }
        public decimal FullOutcome { get; set; }
    }
}
