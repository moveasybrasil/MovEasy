using System.Security.Cryptography;
using System.Text.Json;
using System.Text;
using Dapper;

namespace Backend.Infrastructure
{
    public class PasswordHasher : Connection
    {

        public string SaltPath = "salt.txt";

        public async Task<string> HashPassword(string Password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                string salt = await GetSalt();
                byte[] passwordBytes = Encoding.UTF8.GetBytes(Password + salt);
                byte[] hashBytes = sha256.ComputeHash(passwordBytes);
                string hashString = Convert.ToBase64String(hashBytes);

                return hashString;
            }
        }

        public async Task<bool> VerifyPassword(string email, string Password)
        {

            string hashedPass = "";

            try
            {
                string sql = "SELECT PasswordHash FROM USER WHERE EMAIL = @email";
                hashedPass = await GetConnection().QueryFirstAsync<string>(sql, new { email });
            } catch (Exception ex)
            {
                return false;
            }

            return (hashedPass == await HashPassword(Password));
        }

        public static byte[] GenerateSalt(int length = 16)
        {
            using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
            {
                byte[] salt = new byte[length];
                rng.GetBytes(salt);
                return salt;
            }
        }

        private async Task<string> GetSalt()
        {
            string salt = string.Empty;
            try
            {
                string json = File.ReadAllText(this.SaltPath);
                salt = JsonSerializer.Deserialize<String>(json);
            }
            catch (System.IO.FileNotFoundException)
            {
                salt = await SetSalt();
            }
            catch (Exception ex)
            {
                Console.Clear();
                Console.WriteLine($"\nErro ao ler arquivo de dados.\n*Err: {ex.Message}");
            }

            return salt;
        }

        private async Task<string> SetSalt()
        {
            string data = Convert.ToBase64String(GenerateSalt());

            try
            {
                string json = JsonSerializer.Serialize(data);
                File.WriteAllText(this.SaltPath, json);
            }
            catch (Exception ex)
            {
                Console.Clear();
                Console.WriteLine($"\nErro ao salvar arquivo de dados.\n*Err: {ex.Message}");
            }

            return data;
        }

    }
}
