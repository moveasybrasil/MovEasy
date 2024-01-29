using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using System.Net.Mail;

namespace Backend.Converter
{
    public class UserConverter
    {
        public async static Task<UserEntity> Convert(UserDTO user)
        {
            if(!await CheckIfEmailIsValid(user.Email)) { throw new Exception("Email inválido."); }

            if(!await CheckIfPasswordIsValid(user.Password)) { throw new Exception("Senha inválida."); }

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

        public async static Task<UserDTO> Deconvert(UserEntity userEntity)
        {
            UserDTO userDTO = new UserDTO()
            {
                Document = userEntity.Document,
                Telephone = userEntity.Telephone1,
                Name = userEntity.Name,
                Email = userEntity.Email,
                Password = "********",
                Type = userEntity.Type
            };
            return userDTO;
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

        private async static Task<bool> CheckIfEmailIsValid(string email)
        {
            try
            {
                new MailAddress(email);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private async static Task<bool> CheckIfPasswordIsValid(string password)
        {
            if (password == null || password.Length < 8) { return false; }
            return true;
        }
    }
}