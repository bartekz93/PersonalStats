using Personal.Shared.Models;

namespace Personal.User.Data.Models
{
    public class User : BaseEntity
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public virtual ICollection<Login> Logins { get; set; }
    }
}
