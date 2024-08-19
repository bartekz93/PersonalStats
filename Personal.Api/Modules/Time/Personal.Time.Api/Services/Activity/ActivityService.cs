using Dapper;
using Personal.Shared.Dtos;
using Personal.Time.Api.Dto.Activity;
using Personal.Time.Api.Resources;
using Personal.Time.Data;

namespace Personal.Time.Api.Services.Activity
{
    public class ActivityService : IActivityService
    {
        private readonly TimeContext timeContext;

        public ActivityService(TimeContext timeContext)
        {
            this.timeContext = timeContext;
        }

        public async Task<int> Create(ActivityEdit dto, int userId)
        {
            var model = new Data.Models.Activity
            {
                Color = dto.Color,
                Name = dto.Name,
                Icon = dto.Icon,
                IsActive = true,
                UserId = userId,
                ModifyUserId = userId,
                CreateUserId = userId,
            };

            timeContext.Activities.Add(model);
            await timeContext.SaveChangesAsync();

            return model.Id;
        }

        public async Task Delete(int id, int userId)
        {
            var model = timeContext.Activities.Where(x => x.Id == id).FirstOrDefault();
            model.IsActive = false;
            model.ModifyDate = DateTime.Now;
            model.ModifyUserId = userId;
            await timeContext.SaveChangesAsync();
        }

        public async Task Edit(ActivityEdit dto, int userId)
        {
            var model = timeContext.Activities.Where(x => x.Id == dto.Id).FirstOrDefault();
            model.Color = dto.Color;
            model.Name = dto.Name;
            model.Icon = dto.Icon;
            model.ModifyDate = DateTime.Now;
            model.ModifyUserId = userId;
            await timeContext.SaveChangesAsync();
        }

        public async Task<SearchResult<ActivitySearchItem>> Search(ActivitySearchCriteria criteria, int userId)
        {
            using (var connection = timeContext.GetConnection())
            {
                var p = new DynamicParameters();
                p.Add("User_Id", userId);
                p.Add("Name", criteria.Name);
                p.Add("Offset", criteria.Offset);
                p.Add("Rows", criteria.Rows ?? int.MaxValue);

                var items = await connection.QueryAsync<ActivitySearchItem>(Sql.Activity_Search, p);
                return new SearchResult<ActivitySearchItem>(items);
            }
        }
    }
}
