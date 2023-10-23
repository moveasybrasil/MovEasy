using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text.Json;
using MovEasy.Entity;
using Dapper;

namespace MovEasy.Helpers
{
    internal class PasswordHasher : Database
    {
        public static string Salt = GetSalt();
        public static string SaltPath = "salt.txt";
        public static string HashPassword(string Password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(Password + Salt);
                byte[] hashBytes = sha256.ComputeHash(passwordBytes);
                string hashString = Convert.ToBase64String(hashBytes);

                return hashString;
            }
        }

        public static bool VerifyPassword(string EMAIL, string Password)
        {

            string sql = $"SELECT PASSWORDHASH FROM {UsuarioEntity.DatabaseName} WHERE EMAIL = @EMAIL";
            object parameters = new { EMAIL };

            string hashedPass = SQLConnection().QueryFirst<String>(sql, parameters);

            return (hashedPass == HashPassword(Password));
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

        public static string GetSalt()
        {
            string data = string.Empty;
            try
            {
                string json = File.ReadAllText("salt.txt");
                data = JsonSerializer.Deserialize<String>(json);
            }
            catch (System.IO.FileNotFoundException)
            {
                data = SetSalt();
            }
            catch (Exception ex)
            {
                Console.Clear();
                Console.WriteLine($"\nErro ao ler arquivo de dados.\n*Err: {ex.Message}");
            }

            return data;
        }

        public static string SetSalt()
        {
            string data = Convert.ToBase64String(GenerateSalt());

            try
            {
                string json = JsonSerializer.Serialize(data);
                File.WriteAllText("salt.txt", json);
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
