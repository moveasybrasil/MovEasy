using System.Security.Cryptography;
using System.Text.Json;
using System.Text;
using Dapper;

namespace Backend.Infrastructure
{
    public class PasswordHasher : Connection
    {

        private static string Salt = "J5c8\\u002BtzsYCEb\\u002BWcXHrDsYA==";

        public async Task<string> HashPassword(string Password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                string salt = PasswordHasher.Salt;
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
    }
}
