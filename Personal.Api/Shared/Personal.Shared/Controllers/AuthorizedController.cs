using Microsoft.AspNetCore.Mvc;
using Personal.Shared.Dtos;
using Personal.Shared.Interfaces;

namespace Personal.Shared.Controllers
{
    public class AuthorizedController : ControllerBase
    {
        private readonly IAuthorizedUserProvider authorizedUserProvider;

        private AuthorizedUser _authorizedUser;
        protected AuthorizedUser AuthorizedUser
        {
            get
            {
                if (_authorizedUser == null)
                {
                    var authUserProvider = HttpContext.RequestServices.GetService<IAuthorizedUserProvider>();
                    _authorizedUser = authUserProvider.Get(HttpContext.User.Identity.Name);
                }
                return _authorizedUser;
            }
        }
    }
}
