using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Personal.Shared.Controllers;
using Personal.Time.Api.Dto.Activity;
using Personal.Time.Api.Services.Activity;

namespace Personal.Time.Api.Controllers
{
    [ApiController]
    [Route("time/activities")]
    [Authorize]
    public class ActivityController : AuthorizedController
    {
        private readonly IActivityService activityService;

        public ActivityController(IActivityService activityService)
        {
            this.activityService = activityService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(ActivityEdit dto)
        {
            var result = await activityService.Create(dto, AuthorizedUser.Id);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(ActivityEdit dto)
        {
            await activityService.Edit(dto, AuthorizedUser.Id);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await activityService.Delete(id, AuthorizedUser.Id);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] ActivitySearchCriteria criteria)
        {
            var result = await activityService.Search(criteria, AuthorizedUser.Id);
            return Ok(result);
        }
    }
}
