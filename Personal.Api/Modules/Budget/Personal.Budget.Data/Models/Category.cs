using Microsoft.EntityFrameworkCore;
using Personal.Shared.Models;

namespace Personal.Budget.Data.Models
{
    public class Category : BaseEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Icon { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }

    internal static class CategoryMapping
    {
        public static void Configure(ModelBuilder builder)
        {
            builder.Entity<Category>(entity =>
            {
                entity.ToTable("Category", "budget");
                entity.Property(x => x.CreateUserId).HasColumnName("CreateUser_Id");
                entity.Property(x => x.ModifyUserId).HasColumnName("ModifyUser_Id");

                entity.Property(x => x.UserId).HasColumnName("User_Id");
                entity.HasMany(x => x.Transactions)
                    .WithOne(x => x.Category)
                    .HasForeignKey(x => x.CategoryId);
            });
        }
    }
}
