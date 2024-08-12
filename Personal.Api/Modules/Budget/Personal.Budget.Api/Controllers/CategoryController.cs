using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Personal.Budget.Api.Dto.Category;
using Personal.Budget.Api.Services.Category;
using Personal.Shared.Controllers;

namespace Personal.Budget.Api.Controllers
{
    [ApiController]
    [Route("budget/categories")]
    [Authorize]
    public class CategoryController : AuthorizedController
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CategoryEdit dto)
        {
            var result = await categoryService.Create(dto, AuthorizedUser.Id);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(CategoryEdit dto)
        {
            await categoryService.Edit(dto, AuthorizedUser.Id);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await categoryService.Delete(id, AuthorizedUser.Id);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] CategorySearchCriteria criteria)
        {
            var result = await categoryService.Search(criteria, AuthorizedUser.Id);
            return Ok(result);
        }
    }
}
