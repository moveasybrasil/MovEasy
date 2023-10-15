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
            Console.Clear();
            Console.WriteLine("Digite o email.");
            this.email = Console.ReadLine();

            Console.WriteLine("Digite sua senha");
            (this.passwordHash, this.passwordSalt) = PasswordHasher.HashPassword(Console.ReadLine());

        }

        public void Atualizar()
        {
            Console.Clear();
            Console.WriteLine($"Digite o novo email <{email}>");
            this.email = Console.ReadLine();

            Console.WriteLine($"Digite uma nova senha.");
            (this.passwordHash, this.passwordSalt) = PasswordHasher.HashPassword(Console.ReadLine());

        }
        public void Mostrar()
        {
            Console.WriteLine($"{nome} - {email} - {telefone} - {endereco}");
        }

        public static string DatabaseName = "USUARIO";
        public static string DatabaseValues = 
            "email = @email, " +
            "passwordHash = @passwordHash, " +
            "passwordSalt = @passwordSalt, " +
            "nome = @nome, " +
            "telefone = @telefone, " +
            "endereco = @endereco";

        public string email { get; set; }
        public string passwordHash { get;set; }
        public string passwordSalt { get; set; }
        public string nome { get; set; }
        public string telefone { get; set; }
        public string endereco { get; set; }

    }
}
