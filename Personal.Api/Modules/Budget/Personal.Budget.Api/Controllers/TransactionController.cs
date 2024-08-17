using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Personal.Budget.Api.Dto.Transaction;
using Personal.Budget.Api.Services.Transaction;
using Personal.Shared.Controllers;

namespace Personal.Budget.Api.Controllers
{
    [ApiController]
    [Route("budget/transactions")]
    [Authorize]
    public class TransactionController : AuthorizedController
    {
        private readonly ITransactionService transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            this.transactionService=transactionService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(TransactionEdit dto)
        {
            var result = await transactionService.Create(dto, AuthorizedUser.Id);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(TransactionEdit dto)
        {
            await transactionService.Edit(dto, AuthorizedUser.Id);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await transactionService.Delete(id, AuthorizedUser.Id);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] TransactionSearchCriteria criteria)
        {
            var result = await transactionService.Search(criteria, AuthorizedUser.Id);
            return Ok(result);
        }
    }
}
