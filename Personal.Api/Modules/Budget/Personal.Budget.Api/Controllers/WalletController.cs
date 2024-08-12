using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Personal.Budget.Api.Dto;
using Personal.Budget.Api.Services;
using Personal.Shared.Controllers;

namespace Personal.Budget.Api.Controllers
{
    [ApiController]
    [Route("budget/wallets")]
    [Authorize]
    public class WalletController : AuthorizedController
    {
        private readonly IWalletService walletService;

        public WalletController(IWalletService walletService)
        {
            this.walletService=walletService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(WalletEdit dto)
        {
            var result = await walletService.Create(dto, AuthorizedUser.Id);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(WalletEdit dto)
        {
            await walletService.Edit(dto, AuthorizedUser.Id);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await walletService.Delete(id, AuthorizedUser.Id);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery]WalletSearchCriteria criteria)
        {
            var result = await walletService.Search(criteria, AuthorizedUser.Id);
            return Ok(result);
        }
    }
}
