using Backend.DTO;
using Backend.Entity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Contracts.Repository
{
    public interface IUserRepository
    {
        Task<string> Add(UserDTO user);
        Task<string> AddPhoto(Stream image, string name, string type);
        Task Update(UserEntity user);
        Task UpdatePassword(UserPasswordDTO user);
        Task Delete(int id);
        Task<UserEntity> GetById(int id);
        Task<string> GetUserPhoto(string email);
        Task<IEnumerable<UserEntity>> Get();
        Task<UserTokenDTO> Login(UserLoginDTO user);
        Task<string> ForgotPassword(string email);
        Task<string> RenewPassword(UserPasswordRecoveryDTO user);
        Task<string> ValidateUUID(string UUID);
        Task<string> ValidateEmail(string UUID);
    }
}
