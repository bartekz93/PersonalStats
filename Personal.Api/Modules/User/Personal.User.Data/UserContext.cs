using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Personal.User.Data.Models;

namespace Personal.User.Data
{
    public class UserContext : DbContext
    {
        public virtual DbSet<Models.User> Users { get; set; }
        public virtual DbSet<Login> Logins { get; set; }

        private readonly IConfiguration configuration;

        public UserContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            ConfigureUser(builder);
            ConfigureLogin(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("DbConnectionString"));
            }
        }

        private void ConfigureLogin(ModelBuilder builder)
        {
            builder.Entity<Login>(entity =>
            {
                entity.ToTable("Login", "user");
                entity.Property(x => x.UserId).HasColumnName("User_Id");
            });
        }

        private void ConfigureUser(ModelBuilder builder)
        {
            builder.Entity<Models.User>(entity =>
            {
                entity.ToTable("User", "user");
                entity.Property(x => x.CreateUserId).HasColumnName("CreateUser_Id");
                entity.Property(x => x.ModifyUserId).HasColumnName("ModifyUser_Id");

                entity
                    .HasMany(i => i.Logins)
                    .WithOne(s => s.User)
                    .HasForeignKey(s => s.UserId);
            });
        }
    }
}
