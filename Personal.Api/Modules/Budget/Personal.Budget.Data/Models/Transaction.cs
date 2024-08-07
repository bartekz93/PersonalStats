using Microsoft.EntityFrameworkCore;
using Personal.Shared.Models;

namespace Personal.Budget.Data.Models
{
    public class Transaction : BaseEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WalletId { get; set; }
        public int CategoryId { get; set; }
        public virtual Wallet Wallet { get; set; }
        public virtual Category Category { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Note { get; set; }
    }

    internal static class TransactionMapping
    {
        public static void Configure(ModelBuilder builder)
        {
            builder.Entity<Transaction>(entity =>
            {
                entity.ToTable("Transaction", "budget");
                entity.Property(x => x.CreateUserId).HasColumnName("CreateUser_Id");
                entity.Property(x => x.ModifyUserId).HasColumnName("ModifyUser_Id");

                entity.Property(x => x.UserId).HasColumnName("User_Id");
                entity.Property(x => x.WalletId).HasColumnName("Wallet_Id");
                entity.Property(x => x.CategoryId).HasColumnName("Category_Id");
            });
        }
    }
}
