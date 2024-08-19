using Microsoft.EntityFrameworkCore;
using Personal.Shared.Models;

namespace Personal.Time.Data.Models
{
    public class Entry : BaseEntity
    {
        public int Id { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int ActivityId { get; set; }
        public virtual Activity Activity { get; set; }
        public string Description { get; set; }
    }

    internal static class EntryMapping
    {
        public static void Configure(ModelBuilder builder)
        {
            builder.Entity<Entry>(entity =>
            {
                entity.ToTable("Entry", "time");
                entity.Property(x => x.CreateUserId).HasColumnName("CreateUser_Id");
                entity.Property(x => x.ModifyUserId).HasColumnName("ModifyUser_Id");

                entity.Property(x => x.ActivityId).HasColumnName("Activity_Id");
            });
        }
    }
}
