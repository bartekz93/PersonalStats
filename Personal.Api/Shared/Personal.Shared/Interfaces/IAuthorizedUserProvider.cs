using Personal.Shared.Dtos;

namespace Personal.Shared.Interfaces
{
    public interface IAuthorizedUserProvider
    {
        AuthorizedUser Get(string username);
    }
}
