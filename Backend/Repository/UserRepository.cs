using Dapper;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using System.Text;
using System.Security.Cryptography;
using Backend.Converter;
using Microsoft.AspNetCore.StaticFiles;

namespace Backend.Repository
{
    public class UserRepository : Connection, IUserRepository
    {
        public async Task<string> Add(UserDTO userDTO)
        {
            UserEntity user = await UserConverter.Convert(userDTO);
            string UUID = CreateRandomUUID();
            user.EmailValidationUUID = UUID;
            string sql = @"
                INSERT INTO User (
                        Document,
                        Telephone1,
                        Telephone2,
                        Name, 
                        Email, 
                        PasswordHash,
                        Type,
                        CNH,
                        Photo,
                        Role,
                        EmailValidationUUID
                    ) VALUE (
                        @Document,
                        @Telephone1,
                        @Telephone2,
                        @Name,
                        @Email, 
                        @PasswordHash,
                        @Type,
                        @CNH,
                        @Photo,
                        @Role,
                        @EmailValidationUUID
                    )
            ";
            try
            {
                await Execute(sql , user);
            } catch (Exception ex)
            {
                throw new Exception($"Não foi possivel cadastrar usuário. {ex.Message}");
            }

            try
            {
                Email email = new Email();
                await email.SendEmail(
                    user.Email,
                    "MovEasy - Confirmação de Email",
                    $"Olá, {user.Name}\n\nClique no link abaixo para confirmar seu email\n\nmoveasybrasil.github.io/MovEasy/user/validation/email?UUID={UUID}\n\n"
                );
                return "Cadastro efetuado";
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> AddPhoto(Stream image, string fileName, string email)
        {
            string id, path, sql;
            try
            {
                sql = "SELECT Id FROM User WHERE Email = @email";
                id = await GetConnection().QueryFirstAsync<string>(sql , new { email });
                path = $"user/{id}{Path.GetExtension(fileName)}";
            } catch (Exception ex)
            {
                throw new Exception($"0- {ex.Message}");
            }


            try
            {
                CloudflareClient CloudFlareClient = new CloudflareClient();
                await CloudFlareClient.UploadImage(
                    image,
                    path,
                    GetContentTypeFromFileName(fileName)
                );
            } catch (Exception ex)
            {
                throw new Exception ($"1- {ex.Message}");
            }

            try
            {
                sql = @"
                    UPDATE User 
                        SET 
                            Photo = @Photo
                        WHERE
                            Id = @Id
                ";
                await Execute(sql, new {Photo = path, Id = id});
            } catch (Exception ex)
            {
                throw new Exception($"2- {ex.Message}");
            }

            return "Imagem Salva";
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM User WHERE Id = @id";

            await Execute(sql, new { id });
        }

        public async Task<IEnumerable<UserEntity>> Get()
        {
            string sql = "SELECT * FROM User";
            return await GetConnection().QueryAsync<UserEntity>(sql);
        }

        public async Task<UserEntity> GetById(int id)
        {
            string sql = "SELECT * FROM User WHERE Id = @id";
            return await GetConnection().QueryFirstAsync<UserEntity>(sql, new {id});
        }

        public async Task<string> GetUserPhoto(string email)
        {
            string sql = "SELECT Photo FROM User WHERE Email = @email";
            try
            {
                return await GetConnection().QueryFirstAsync<string>(sql, new { email });
            } catch (Exception ex)
            {
                return "user/default.jpg";
            }
        }

        public async Task Update(UserEntity user)
        {
            string sql = @"
                UPDATE User 
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
                        Photo = @Photo
                    WHERE
                        Id = @Id
            ";

            await Execute(sql, user);

        }

        public async Task UpdatePassword(UserPasswordDTO user)
        {
            string sql = @"
                UPDATE User 
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
            string sql = "SELECT * FROM User WHERE Email = @Email and PasswordHash = @Password";

            PasswordHasher hasher = new PasswordHasher();
            user.Password = await hasher.HashPassword(user.Password);

            UserEntity userLogin = await GetConnection().QueryFirstAsync<UserEntity>(sql, user);

            return new UserTokenDTO
            {
                Token = Authentication.GenerateToken(userLogin),
                User = userLogin
            };
        }

        public async Task<string> ValidateEmail(string UUID)
        {
            string sql = "SELECT Id FROM User WHERE EmailValidationUUID = @UUID";
            string id = string.Empty;
            try
            {
                id = await GetConnection().QueryFirstAsync<string>(sql, new { UUID });
            }
            catch (Exception ex)
            {
                return "UUID Inválido.";
            }

            sql = @"
                UPDATE User 
                    SET 
                        EmailValidationUUID = @UUID,
                        EmailValidationDate = @Date
                    WHERE
                        Id = @id
            ";
            try
            {
                await Execute(sql, new {UUID = (string?)null, Date = (DateTime)DateTime.Now, id});
            } catch (Exception ex)
            {
                return $"Erro ao atualizar banco de dados. {ex.Message}";
            }

            return "Email Validado!";
        }

        public async Task<string> ForgotPassword(string receiverEmail)
        {
            UserEntity user = new UserEntity();
            try
            {
                string sql = "SELECT * FROM User WHERE Email = @receiverEmail";
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
                UPDATE User 
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
            return await email.SendEmail(
                receiverEmail, 
                "Recuperação de senha MovEasy", 
                $"Olá, {user.Name}\n\nClique no link abaixo para definir uma nova senha\n\nmoveasybrasil.github.io/MovEasy/user/recovery/password?UUID={UUID}\n\n"
            );
        }

        public async Task<string> RenewPassword(UserPasswordRecoveryDTO user)
        {
            string sql = "SELECT Id FROM User WHERE PasswordRecoveryUUID = @UUID";
            string UUID = user.UUID;
            string id = string.Empty;
            try
            {
                id = await GetConnection().QueryFirstAsync<string>(sql, new { UUID });
            } catch (Exception ex)
            {
                return "UUID Inválido.";
            }

            sql = "SELECT PasswordRecoveryDate FROM User WHERE Id = @id";
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

            sql = @"UPDATE User 
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
            string sql = "SELECT Id FROM User WHERE PasswordRecoveryUUID = @UUID";
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

        private string GetContentTypeFromFileName(string fileName)
        {
            string contentType;
            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out contentType);
            return contentType ?? "application/octet-stream";
        }
    }
}
