using Microsoft.EntityFrameworkCore;
using Personal.Shared.Models;

namespace Personal.Time.Data.Models
{
    public class Activity : BaseEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Icon { get; set; }
        public virtual ICollection<Entry> Entries { get; set; }
    }

    internal static class ActivityMapping
    {
        public static void Configure(ModelBuilder builder)
        {
            builder.Entity<Activity>(entity =>
            {
                entity.ToTable("Activity", "time");
                entity.Property(x => x.CreateUserId).HasColumnName("CreateUser_Id");
                entity.Property(x => x.ModifyUserId).HasColumnName("ModifyUser_Id");

                entity.Property(x => x.UserId).HasColumnName("User_Id");
                entity.HasMany(x => x.Entries)
                    .WithOne(x => x.Activity)
                    .HasForeignKey(x => x.ActivityId);
            });
        }
    }
}
