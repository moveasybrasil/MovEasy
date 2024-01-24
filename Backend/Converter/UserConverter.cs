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
            user.Password = await hasher.HashPassword(user.Password);

            UserEntity userEntity = new UserEntity()
            {
                Name = user.Name,
                Email = user.Email,
                PasswordHash = await hasher.HashPassword(user.Password),
                Document = user.Document,
                Telephone1 = user.Telephone1,
                Telephone2 = user.Telephone2,
                Type = user.Type,
                Role = "default"
            };
            return userEntity;
        }

    }
}