using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Dto
{
    public class WalletSearchItem : SearchItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Currency { get; set; }
    }
}
