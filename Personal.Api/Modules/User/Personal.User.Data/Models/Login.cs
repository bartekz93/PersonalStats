namespace Personal.User.Data.Models
{
    public class Login
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public string Ip { get; set; }
        public bool IsSuccess { get; set; }
    }
}
