namespace Personal.Shared.Models
{
    public class BaseEntity
    {
        public int CreateUserId { get; set; } = 1;
        public int ModifyUserId { get; set; } = 1;
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime ModifyDate { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
    }
}
