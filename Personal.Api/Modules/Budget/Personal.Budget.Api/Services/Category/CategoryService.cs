using Dapper;
using Personal.Budget.Api.Dto.Category;
using Personal.Budget.Api.Resources;
using Personal.Budget.Data;
using Personal.Shared.Dtos;

namespace Personal.Budget.Api.Services.Category
{
    public class CategoryService : ICategoryService
    {
        private readonly BudgetContext budgetContext;

        public CategoryService(BudgetContext budgetContext)
        {
            this.budgetContext = budgetContext;
        }

        public async Task<int> Create(CategoryEdit dto, int userId)
        {
            var model = new Data.Models.Category
            {
                Color = dto.Color,
                Name = dto.Name,
                Icon = dto.Icon,
                Type = dto.Type,
                IsActive = true,
                UserId = userId,
                ModifyUserId = userId,
                CreateUserId = userId
            };

            budgetContext.Categories.Add(model);
            await budgetContext.SaveChangesAsync();

            return model.Id;
        }

        public async Task Delete(int id, int userId)
        {
            var wallet = budgetContext.Categories.Where(x => x.Id == id).FirstOrDefault();
            wallet.IsActive = false;
            wallet.ModifyDate = DateTime.Now;
            wallet.ModifyUserId = userId;
            await budgetContext.SaveChangesAsync();
        }

        public async Task Edit(CategoryEdit dto, int userId)
        {
            var wallet = budgetContext.Categories.Where(x => x.Id == dto.Id).FirstOrDefault();
            wallet.Color = dto.Color;
            wallet.Name = dto.Name;
            wallet.Icon = dto.Icon;
            wallet.Type = dto.Type;
            wallet.ModifyDate = DateTime.Now;
            wallet.ModifyUserId = userId;
            await budgetContext.SaveChangesAsync();
        }

        public async Task<SearchResult<CategorySearchItem>> Search(CategorySearchCriteria criteria, int userId)
        {
            using (var connection = budgetContext.GetConnection())
            {
                var p = new DynamicParameters();
                p.Add("User_Id", userId);
                p.Add("Name", criteria.Name);
                p.Add("Type", criteria.Type);
                p.Add("Offset", criteria.Offset);
                p.Add("Rows", criteria.Rows ?? int.MaxValue);

                var items = await connection.QueryAsync<CategorySearchItem>(Sql.Category_Search, p);
                return new SearchResult<CategorySearchItem>(items);
            }
        }
    }
}
