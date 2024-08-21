using Dapper;
using Personal.Shared.Dtos;
using Personal.Time.Api.Dto.Entry;
using Personal.Time.Api.Resources;
using Personal.Time.Data;

namespace Personal.Time.Api.Services.Entry
{
    public class EntryService : IEntryService
    {
        private readonly TimeContext timeContext;

        public EntryService(TimeContext timeContext)
        {
            this.timeContext = timeContext;
        }

        public async Task<int> Create(EntryEdit dto, int userId)
        {
            var dateStr = dto.Date.ToString("yyyy-MM-dd");
            var model = new Data.Models.Entry
            {
                IsActive = true,
                ActivityId = dto.ActivityId,
                DateFrom = DateTime.ParseExact($"{dateStr} {dto.TimeFrom}", "yyyy-MM-dd HH:mm", null),
                DateTo = DateTime.ParseExact($"{dateStr} {dto.TimeTo}", "yyyy-MM-dd HH:mm", null),
                Description = dto.Description,
                ModifyUserId = userId,
                CreateUserId = userId,
            };

            timeContext.Entries.Add(model);
            await timeContext.SaveChangesAsync();

            return model.Id;
        }

        public async Task Delete(int id, int userId)
        {
            var model = timeContext.Entries.Where(x => x.Id == id).FirstOrDefault();
            model.IsActive = false;
            model.ModifyDate = DateTime.Now;
            model.ModifyUserId = userId;
            await timeContext.SaveChangesAsync();
        }

        public async Task Edit(EntryEdit dto, int userId)
        {
            var dateStr = dto.Date.ToString("yyyy-MM-dd");
            var model = timeContext.Entries.Where(x => x.Id == dto.Id).FirstOrDefault();
            model.Description = dto.Description;
            model.DateFrom = DateTime.ParseExact($"{dateStr} {dto.TimeFrom}", "yyyy-MM-dd HH:mm", null);
            model.DateTo = DateTime.ParseExact($"{dateStr} {dto.TimeTo}", "yyyy-MM-dd HH:mm", null); ;
            model.ActivityId = dto.ActivityId;
            model.ModifyDate = DateTime.Now;
            model.ModifyUserId = userId;
            await timeContext.SaveChangesAsync();
        }

        public async Task<SearchResult<EntrySearchItem>> Search(EntrySearchCriteria criteria, int userId)
        {
            using (var connection = timeContext.GetConnection())
            {
                var p = new DynamicParameters();
                p.Add("User_Id", userId);
                p.Add("DateFrom", criteria.DateFrom);
                p.Add("DateTo", criteria.DateTo);
                p.Add("Offset", criteria.Offset);
                p.Add("Rows", criteria.Rows ?? int.MaxValue);

                var items = await connection.QueryAsync<EntrySearchItem>(Sql.Entry_Search, p);
                return new SearchResult<EntrySearchItem>(items);
            }
        }
    }
}
