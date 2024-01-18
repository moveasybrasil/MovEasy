using Backend.DTO;
using Backend.Entity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Contracts.Repository
{
    public interface IUserRepository
    {
        Task Add(UserDTO user);
        Task Update(UserEntity user);
        Task UpdatePassword(UserPasswordDTO user);
        Task Delete(int id);
        Task<UserEntity> GetById(int id);
        Task<IEnumerable<UserEntity>> Get();
        Task<UserTokenDTO> Login(UserLoginDTO user);
        Task<string> EsqueciSenha(string email);
    }
}
