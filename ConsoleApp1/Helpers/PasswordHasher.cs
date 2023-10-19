using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace ConsoleApp1.Helpers
{
    internal class PasswordHasher
    {
        public static (string, string) HashPassword(string Password)
        {
            byte[] salt = GenerateSalt();
            string saltString = Convert.ToBase64String(salt);

            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(Password + saltString);
                byte[] hashBytes = sha256.ComputeHash(passwordBytes);
                string hashString = Convert.ToBase64String(hashBytes);

                return (hashString, saltString);
            }
        }

        public static (string, string) HashPassword(string Password, string saltString)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(Password + saltString);
                byte[] hashBytes = sha256.ComputeHash(passwordBytes);
                string hashString = Convert.ToBase64String(hashBytes);

                return (hashString, saltString);
            }
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
