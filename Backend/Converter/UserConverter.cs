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

        public async static Task<UserEntity> Merge(UserEntity userEntity, UserUpdateDTO userUpdateDTO)
        {
            userEntity.Document = userUpdateDTO.Document;
            userEntity.Email = userUpdateDTO.Email;
            userEntity.Telephone1 = userUpdateDTO.Telephone1;
            userEntity.Telephone2 = userUpdateDTO.Telephone2;
            userEntity.Name = userUpdateDTO.Name;
            userEntity.Type = userUpdateDTO.Type;
            userEntity.CNH = userUpdateDTO.CNH;

            return userEntity;
        }

    }
}