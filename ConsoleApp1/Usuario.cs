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
            (this.PasswordHash, this.PasswordSalt) = PasswordHasher.HashPassword(Console.ReadLine());

        }

        private string Email { get; set; }
        private string PasswordHash { get;set; }
        private string PasswordSalt { get; set; }
        private string Nome { get; set; }
        private long Telefone { get; set; }
        private string Endereco { get; set; }

    }
}
