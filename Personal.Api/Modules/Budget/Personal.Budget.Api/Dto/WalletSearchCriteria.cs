using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Dto
{
    public class WalletSearchCriteria : SearchCriteria
    {
        public string Name { get; set; }
        public string Currency { get; set; }
    }
}
