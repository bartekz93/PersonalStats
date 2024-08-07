using Microsoft.EntityFrameworkCore;
using Personal.Shared.Models;

namespace Personal.Budget.Data.Models
{
    public class Wallet : BaseEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Currency { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }

    internal static class WalletMapping
    {
        public static void Configure(ModelBuilder builder)
        {
            builder.Entity<Wallet>(entity =>
            {
                entity.ToTable("Wallet", "budget");
                entity.Property(x => x.CreateUserId).HasColumnName("CreateUser_Id");
                entity.Property(x => x.ModifyUserId).HasColumnName("ModifyUser_Id");

                entity.Property(x => x.UserId).HasColumnName("User_Id");
                entity.HasMany(x => x.Transactions)
                    .WithOne(x => x.Wallet)
                    .HasForeignKey(x => x.WalletId);
            });
        }
    }
}
