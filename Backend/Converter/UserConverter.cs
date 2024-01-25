using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;

namespace Backend.Converter
{
    public class UserConverter
    {
        public async static Task<UserEntity> Convert(UserDTO user)
        {
            PasswordHasher hasher = new PasswordHasher();

            UserEntity userEntity = new UserEntity()
            {
                Name = user.Name,
                Email = user.Email,
                PasswordHash = await hasher.HashPassword(user.Password),
                Document = user.Document,
                Telephone1 = user.Telephone,
                Type = user.Type,
                Role = "default"
            };
            return userEntity;
        }

    }
}