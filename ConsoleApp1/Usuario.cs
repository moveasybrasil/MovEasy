using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class Usuario
    {
        public Usuario() 
        {
            Console.WriteLine("Digite o email.");
            this.Email = Console.ReadLine();

            Console.WriteLine("Digite sua senha");
            this.Password = Console.ReadLine();

        }

        private string Email;
        private string PasswordSalt;
        private string Password
        {
            get
            {
                return this.Password;
            }
            set
            {
                this.Password = HashPassword(value);
            }
        }
        private string Nome;
        private long Telefone;
        private string Endereco;

        private string HashPassword(string password)
        {
            //ToDo: Implementar sistema de hash para a senha.
            return password;
        }
    }
}
