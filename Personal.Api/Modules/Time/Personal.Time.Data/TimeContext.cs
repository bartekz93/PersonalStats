using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Personal.Time.Data.Models;

namespace Personal.Time.Data
{
    public class TimeContext : DbContext
    {
        public virtual DbSet<Activity> Activities { get; set; }
        public virtual DbSet<Entry> Entries { get; set; }

        private readonly IConfiguration configuration;

        public TimeContext(IConfiguration configuration)
        {
            this.configuration=configuration;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            ActivityMapping.Configure(builder);
            EntryMapping.Configure(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("DbConnectionString"));
            }
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(Database.GetConnectionString());
        }
    }
}
