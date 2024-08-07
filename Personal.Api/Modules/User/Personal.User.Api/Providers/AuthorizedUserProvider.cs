using Personal.Shared.Dtos;
using Personal.Shared.Interfaces;
using Personal.User.Data;

namespace Personal.User.Api.Providers
{
    public class AuthorizedUserProvider : IAuthorizedUserProvider
    {
        private readonly UserContext userContext;

        public AuthorizedUserProvider(UserContext userContext)
        {
            this.userContext = userContext;
        }

        public AuthorizedUser Get(string username)
        {
            var user = userContext.Users.Where(x => x.Login == username && x.IsActive).FirstOrDefault();
            if (user != null)
            {
                return new AuthorizedUser
                {
                    Login = username,
                    Id = user.Id,
                };
            }
            return null;
        }
    }
}
