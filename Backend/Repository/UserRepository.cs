using Dapper;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;

namespace Backend.Repository
{
    public class UserRepository : Connection, IUserRepository
    {
        public async Task Add(UserDTO user)
        {
            string sql = @"
                INSERT INTO USER (
                        Document,
                        Telephone1,
                        Telephone2,
                        Name,
                        LastName, 
                        Email, 
                        PasswordHash,
                        Type,
                        CNH,
                        Photo,
                        Role
                    ) VALUE (
                        @Document,
                        @Telephone1,
                        @Telephone2,
                        @Name,
                        @LastName,
                        @Email, 
                        @PasswordHash,
                        @Type,
                        @CNH,
                        @Photo,
                        @Role
                    )
            ";

            await Execute(sql , user);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM USER WHERE Id = @id";

            await Execute(sql, new { id });
        }

        public async Task<IEnumerable<UserEntity>> Get()
        {
            string sql = "SELECT * FROM USER";
            return await GetConnection().QueryAsync<UserEntity>(sql);
        }

        public async Task<UserEntity> GetById(int id)
        {
            string sql = "SELECT * FROM USER WHERE Id = @id";
            return await GetConnection().QueryFirstAsync<UserEntity>(sql, new {id});
        }

        public async Task Update(UserEntity user)
        {
            string sql = @"
                UPDATE USER 
                    SET 
                        Document = @Document,
                        Telephone1 = @Telephone1,
                        Telephone2 = @Telephone2,
                        Name = @Name,
                        LastName = @LastName, 
                        Email = @Email, 
                        PasswordHash = @PasswordHash,
                        Type = @Type,
                        CNH = @CNH,
                        Photo = @Photo,
                        Role = @Role
                    WHERE
                        Id = @Id
            ";

            await Execute(sql, user);
        }

        public async Task<UserTokenDTO> Login(UserLoginDTO user)
        {
            string sql = "SELECT * FROM USER WHERE Email = @Email and PasswordHash = @Password";

            UserEntity userLogin = await GetConnection().QueryFirstAsync<UserEntity>(sql, user);

            return new UserTokenDTO
            {
                Token = Authentication.GenerateToken(userLogin),
                User = userLogin
            };
        }
    }
}
