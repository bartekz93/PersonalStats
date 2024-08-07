using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Personal.Budget.Data.Models;

namespace Personal.Budget.Data
{
    public class BudgetContext : DbContext
    {
        public virtual DbSet<Wallet> Wallets { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Transaction> Transactions { get; set; }

        private readonly IConfiguration configuration;

        public BudgetContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            WalletMapping.Configure(builder);
            CategoryMapping.Configure(builder);
            TransactionMapping.Configure(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("BudgetConnectionString"));
            }
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(Database.GetConnectionString());
        }
    }
}
