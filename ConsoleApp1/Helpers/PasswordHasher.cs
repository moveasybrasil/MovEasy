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
        public static string Salt = Convert.ToBase64String(GenerateSalt());
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
