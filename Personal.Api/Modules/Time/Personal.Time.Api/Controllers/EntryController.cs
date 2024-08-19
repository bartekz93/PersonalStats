using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Personal.Shared.Controllers;
using Personal.Time.Api.Dto.Entry;
using Personal.Time.Api.Services.Entry;

namespace Personal.Time.Api.Controllers
{
    [ApiController]
    [Route("time/entries")]
    [Authorize]
    public class EntryController : AuthorizedController
    {
        private readonly IEntryService entryService;

        public EntryController(IEntryService entryService)
        {
            this.entryService = entryService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(EntryEdit dto)
        {
            var result = await entryService.Create(dto, AuthorizedUser.Id);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(EntryEdit dto)
        {
            await entryService.Edit(dto, AuthorizedUser.Id);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await entryService.Delete(id, AuthorizedUser.Id);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] EntrySearchCriteria criteria)
        {
            var result = await entryService.Search(criteria, AuthorizedUser.Id);
            return Ok(result);
        }
    }
}
