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

        public void Popular ()
        {
            Console.Clear();
            Console.WriteLine("Digite o email.");
            this.EMAIL = Console.ReadLine();

            Console.WriteLine("Digite sua senha");
            (this.PASSWORDHASH, this.PASSWORDSALT) = PasswordHasher.HashPassword(Console.ReadLine());
        }

        public void Atualizar()
        {
            Console.Clear();
            Console.WriteLine($"Digite o novo email <{EMAIL}>");
            this.EMAIL = Console.ReadLine();

            Console.WriteLine($"Digite uma nova senha.");
            (this.PASSWORDHASH, this.PASSWORDSALT) = PasswordHasher.HashPassword(Console.ReadLine());

        }
        public void Mostrar()
        {
            Console.WriteLine($"[{ID}] {NOME} - {EMAIL} - {TELEFONE} - {ENDERECO}");
        }

        public static string DatabaseName = "USUARIO";
        public static string DatabaseValues =
            "EMAIL = @EMAIL, " +
            "PASSWORDHASH = @PASSWORDHASH, " +
            "PASSWORDSALT = @PASSWORDSALT, " +
            "NOME = @NOME, " +
            "TELEFONE = @TELEFONE, " +
            "ENDERECO = @ENDERECO";

        public string ID { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORDHASH { get;set; }
        public string PASSWORDSALT { get; set; }
        public string NOME { get; set; }
        public string TELEFONE { get; set; }
        public string ENDERECO { get; set; }

    }
}
