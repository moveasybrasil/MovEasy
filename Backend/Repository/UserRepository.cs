using Dapper;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using System.Text;
using System.Security.Cryptography;

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

            PasswordHasher hasher = new PasswordHasher();
            user.PasswordHash = await hasher.HashPassword(user.PasswordHash);

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

        public async Task UpdatePassword(UserPasswordDTO user)
        {
            string sql = @"
                UPDATE USER 
                    SET 
                        PasswordHash = @newPassword
                    WHERE
                        Email = @Email
            ";

            PasswordHasher hasher = new PasswordHasher();
            if (await hasher.VerifyPassword(user.Email, user.oldPassword))
            {
                user.newPassword = await hasher.HashPassword(user.newPassword);
                await Execute(sql, user);
            }
            else
            {
                throw new Exception();
            }

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

        public async Task<string> ForgotPassword(string receiverEmail)
        {
            UserEntity user = new UserEntity();
            try
            {
                string sql = "SELECT * FROM USER WHERE Email = @receiverEmail";
                user = await GetConnection().QueryFirstAsync<UserEntity>(sql, new { receiverEmail });
            } catch (System.InvalidOperationException ex)
            {
                return await Task.Run(() => "Email não encontrado no banco de dados!");
            } catch (Exception ex)
            {
                return await Task.Run(() => $"Ocorreu um erro inesperado. {ex.Message}");
            }

            string UUID = CreateRandomUUID();

            try
            {
                DateTime Date = DateTime.Now.AddDays(1);
                string sql = @"
                UPDATE USER 
                    SET 
                        PasswordRecoveryUUID = @UUID,
                        PasswordRecoveryDate = @Date
                    WHERE
                        Email = @receiverEmail
                ";
                await Execute(sql, new { UUID, receiverEmail, Date });

            } catch (Exception ex)
            {
                return $"Erro ao gerar código para recuperação de senha. {ex.Message}";
            }

            Email email = new Email();
            return await email.EnviarEmail(
                receiverEmail, 
                "Recuperação de senha MovEasy", 
                $"Olá, {user.Name}\n\nClique no link abaixo para definir uma nova senha\n\nwww.MovEasy.com/user/recovery?uuid={UUID}\n\n"
            );
        }

        public async Task<string> RenewPassword(UserPasswordRecoveryDTO user)
        {
            string sql = "SELECT Id FROM USER WHERE PasswordRecoveryUUID = @UUID";
            string UUID = user.UUID;
            string id = string.Empty;
            try
            {
                id = await GetConnection().QueryFirstAsync<string>(sql, new { UUID });
            } catch (Exception ex)
            {
                return "UUID Inválido.";
            }

            sql = "SELECT PasswordRecoveryDate FROM USER WHERE Id = @id";
            try
            {
                DateTime date = await GetConnection().QueryFirstAsync<DateTime>(sql, new { id });
                if (DateTime.Now > date)
                {
                    return "Este código expirou, tente novamente.";
                }
            } catch (Exception ex)
            {
                return "Erro inesperado.";
            }

            sql = @"UPDATE USER 
                        SET 
                            PasswordHash = @Password,
                            PasswordRecoveryUUID = null,
                            PasswordRecoveryDate = null
                        WHERE
                            PasswordRecoveryUUID = @UUID
            ";
            try
            {
                PasswordHasher hasher = new PasswordHasher();
                user.Password = await hasher.HashPassword(user.Password);
                await Execute(sql, user);
            } catch (Exception ex)
            {
                return "Não foi possível alterar a senha.";
            }

            return "Senha alterada com sucesso.";
        }

        public async Task<string> ValidateUUID(string UUID)
        {
            string sql = "SELECT Id FROM USER WHERE PasswordRecoveryUUID = @UUID";
            try
            {
                await GetConnection().QueryFirstAsync<string>(sql, new { UUID });
            }
            catch (Exception ex)
            {
                throw new Exception("false");
            }

            return "true";
        }
        private string CreateRandomUUID()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
