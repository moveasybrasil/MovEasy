using Backend.DTO;
using Backend.Entity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Contracts.Repository
{
    public interface IUserRepository
    {
        Task<UserTokenDTO> Add(UserDTO user);
        Task<string> AddPhoto(Stream image, string name, string type);
        Task<UserEntity> Update(UserUpdateDTO user, string email);
        Task UpdatePassword(UserPasswordDTO user);
        Task<string> Delete(int id);
        Task<UserDTO> GetById(int id);
        Task<string> GetUserPhoto(string email);
        Task<IEnumerable<UserEntity>> Get();
        Task<UserTokenDTO> Login(UserLoginDTO user);
        Task<string> ForgotPassword(string email);
        Task<string> RenewPassword(UserPasswordRecoveryDTO user);
        Task<bool> ValidateUUID(string UUID);
        Task<string> ValidateEmail(string UUID);
        Task<UserTokenDTO> RenewToken(string email);
    }
}
