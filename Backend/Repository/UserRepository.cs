using Dapper;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using System.Text;
using System.Security.Cryptography;
using Backend.Converter;
using Microsoft.AspNetCore.StaticFiles;
using static System.Net.Mime.MediaTypeNames;
using System.IO;

namespace Backend.Repository
{
    public class UserRepository : Connection, IUserRepository
    {
        public async Task<string> Add(UserDTO userDTO)
        {
            try
            {
                UserEntity user = await UserConverter.Convert(userDTO);
                string UUID = CreateRandomUUID();
                user.EmailValidationUUID = UUID;
                string sql = @"INSERT INTO User (
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
                )";
                await Execute(sql , user);
                await SendConfirmationEmail(user, UUID);
                return "Cadastro efetuado";
            } catch (Exception ex)
            {
                throw new Exception($"Não foi possivel cadastrar usuário: {ex.Message}");
            }
        }

        public async Task<string> AddPhoto(Stream image, string fileName, string email)
        {
            string id, path, sql;
            try
            {
                id = await GetUserIdFromEmail(email);

                path = $"user/{id}{Path.GetExtension(fileName)}";

                await SendImageToCloudflare(image, path, fileName);

                sql = @"UPDATE User SET Photo = @Photo WHERE Id = @Id";
                await Execute(sql, new {Photo = path, Id = id});

                return "Imagem Salva";
            } catch (Exception ex)
            {
                throw new Exception($"Nao foi possivel salvar imagem: {ex.Message}");
            }

        }

        public async Task<string> Delete(int id)
        {
            try
            {
                string sql = "DELETE FROM User WHERE Id = @id";
                await Execute(sql, new { id });
                return "Usuario Deletado!";
            } catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<UserEntity>> Get()
        {
            string sql = "SELECT * FROM User";
            return await GetConnection().QueryAsync<UserEntity>(sql);
        }

        public async Task<UserDTO> GetById(int id)
        {
            string sql = "SELECT * FROM User WHERE Id = @id";
            UserEntity userEntity = await GetConnection().QueryFirstAsync<UserEntity>(sql, new {id});
            return await UserConverter.Deconvert(userEntity);
        }

        public async Task<string> GetUserPhoto(string email)
        {
            try
            {
                string sql = "SELECT Photo FROM User WHERE Email = @email";
                return await GetConnection().QueryFirstAsync<string>(sql, new { email });
            } catch (Exception ex)
            {
                return "user/default.jpg";
            }
        }

        public async Task<string> Update(UserUpdateDTO user, string email)
        {
            try
            {
                string sql = "SELECT * FROM User WHERE Email = @email";
                UserEntity userEntity = await GetConnection().QueryFirstAsync<UserEntity>(sql, new {email});
                userEntity = await UserConverter.Merge(userEntity, user);

                sql = @"UPDATE User SET 
                            Document = @Document,
                            Telephone1 = @Telephone1,
                            Telephone2 = @Telephone2,
                            Name = @Name,
                            Email = @Email, 
                            PasswordHash = @PasswordHash,
                            Type = @Type,
                            CNH = @CNH,
                            Photo = @Photo
                        WHERE
                            Id = @Id
                ";
                await Execute(sql, userEntity);

                return "Dados Atualizados.";
            } catch (Exception ex)
            {
                throw new Exception($"Nao foi possivel alterar os dados: {ex.Message}");
            }
        }

        public async Task UpdatePassword(UserPasswordDTO user)
        {
            try
            {
                PasswordHasher hasher = new PasswordHasher();
                if (await hasher.VerifyPassword(user.Email, user.oldPassword))
                {
                    string sql = "UPDATE User SET PasswordHash = @newPassword WHERE Email = @Email";
                    user.newPassword = await hasher.HashPassword(user.newPassword);
                    await Execute(sql, user);
                }
                else { throw new Exception("Senha antiga incorreta."); }

            } catch (Exception ex)
            {
                throw new Exception($"Nao foi possivel atualizar a senha: {ex.Message}");
            }
        }

        public async Task<UserTokenDTO> Login(UserLoginDTO user)
        {
            try
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
            } catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<UserTokenDTO> RenewToken(string email)
        {
            try
            {
                string sql = "SELECT * FROM User WHERE Email = @email";

                UserEntity userLogin = await GetConnection().QueryFirstAsync<UserEntity>(sql, new {email});

                return new UserTokenDTO
                {
                    Token = Authentication.GenerateToken(userLogin),
                    User = userLogin
                };
            } catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> ValidateEmail(string UUID)
        {
            try
            {
                string id = await GetIdFromEmailUUID(UUID);

                string sql = @"UPDATE User SET 
                            EmailValidationUUID = @UUID,
                            EmailValidationDate = @Date
                        WHERE Id = @id
                ";
           
                await Execute(sql, new {UUID = (string?)null, Date = (DateTime)DateTime.Now, id});

                return "Email Validado!";
            } catch (Exception ex)
            {
                throw new Exception($"Erro ao validar UUID: {ex.Message}");
            }
        }

        public async Task<string> ForgotPassword(string receiverEmail)
        {
            UserEntity? user = new UserEntity();
            try
            {
                string sql = "SELECT * FROM User WHERE Email = @receiverEmail";
                user = await GetConnection().QueryFirstOrDefaultAsync<UserEntity>(sql, new { receiverEmail });
                if(user == null) { throw new Exception("Email inválido."); }

                string UUID = CreateRandomUUID();

                DateTime Date = DateTime.Now.AddDays(1);
                sql = @"UPDATE User SET 
                        PasswordRecoveryUUID = @UUID,
                        PasswordRecoveryDate = @Date
                    WHERE
                        Email = @receiverEmail
                ";
                await Execute(sql, new { UUID, receiverEmail, Date });

                await SendPasswordRecoveryEmail(receiverEmail, user.Name, UUID);

                return $"Email para recuperação enviado para {receiverEmail}";

            } catch (Exception ex)
            {
                return $"Não foi possivel enviar email de recuperação: {ex.Message}";
            }
        }

        public async Task<string> RenewPassword(UserPasswordRecoveryDTO user)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE PasswordRecoveryUUID = @UUID";
                string UUID = user.UUID;
                string? id = await GetConnection().QueryFirstOrDefaultAsync<string>(sql, new { UUID });
                if (id == null) { throw new Exception("UUID Inválido."); }

                sql = "SELECT PasswordRecoveryDate FROM User WHERE Id = @id";
                DateTime date = await GetConnection().QueryFirstAsync<DateTime>(sql, new { id });
                if (DateTime.Now > date) { throw new Exception("O Codigo Expirou."); }

                sql = @"UPDATE User SET 
                                PasswordHash = @Password,
                                PasswordRecoveryUUID = null,
                                PasswordRecoveryDate = null
                            WHERE
                                PasswordRecoveryUUID = @UUID
                ";
                PasswordHasher hasher = new PasswordHasher();
                user.Password = await hasher.HashPassword(user.Password);
                await Execute(sql, user);

                return "Senha alterada com sucesso.";
            } catch (Exception ex)
            {
                throw new Exception($"Nao foi possivel alterar senha: {ex.Message}") ;
            }

        }

        public async Task<bool> ValidateUUID(string UUID)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE PasswordRecoveryUUID = @UUID";
                string? value = await GetConnection().QueryFirstOrDefaultAsync<string?>(sql, new { UUID });

                if (value == null) { return false; } else { return true; }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        private string CreateRandomUUID() { return Guid.NewGuid().ToString();}

        private string GetContentTypeFromFileName(string fileName)
        {
            string contentType;
            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out contentType);
            return contentType ?? "application/octet-stream";
        }

        private async Task SendConfirmationEmail(UserEntity user, string UUID)
        {
            try
            {
                Email email = new Email();
                await email.SendEmail(
                    user.Email,
                    "MovEasy - Confirmação de Email",
                    $"Olá, {user.Name}\n\nClique no link abaixo para confirmar seu email\n\nmoveasybrasil.github.io/MovEasy/user/validation/email?UUID={UUID}\n\n"
                );
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao enviar email de confirmação. Detalhes: {ex.Message}");
            }
        }

        private async Task<string> GetUserIdFromEmail(string email)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE Email = @email";
                return await GetConnection().QueryFirstAsync<string>(sql, new { email });
            } catch (Exception ex)
            {
                throw new Exception($"Nao foi possivel obter id de usuario. {ex.Message}");
            }
        }

        private async Task SendImageToCloudflare(Stream image, string path, string fileName)
        {
            try
            {
                CloudflareClient CloudFlareClient = new CloudflareClient();
                await CloudFlareClient.UploadImage(
                    image,
                    path,
                    GetContentTypeFromFileName(fileName)
                );
            } catch(Exception ex)
            {
                throw new Exception($"Nao foi possivel fazer upload para o servidor de armazenamento. {ex.Message}");
            }
        }

        private async Task<string> GetIdFromEmailUUID(string UUID)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE EmailValidationUUID = @UUID";
                return await GetConnection().QueryFirstAsync<string>(sql, new { UUID });
            }
            catch (Exception ex)
            {
                throw new Exception($"UUID Inválido. {ex.Message}");
            }
        }

        private async Task<string> SendPasswordRecoveryEmail(string receiverEmail, string name, string UUID)
        {
            Email email = new Email();
            return await email.SendEmail(
                receiverEmail,
                "Recuperação de senha MovEasy",
                $"Olá, {name}\n\nClique no link abaixo para definir uma nova senha\n\nmoveasybrasil.github.io/MovEasy/user/recovery/password?UUID={UUID}\n\n"
            );
        }
    }
}
