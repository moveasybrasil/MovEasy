using Backend.Entity;

namespace Backend.DTO
{
    public class UserTokenDTO
    {
        public string Token { get; set; }
        public UserEntity User { get; set; }
    }
}
