namespace Backend.DTO
{
    public class UserPasswordDTO
    {
        public string Email { get; set; }
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
    }
}
