using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using MovEasy.Helpers;

namespace MovEasy.Entity
{
    public class UsuarioEntity
    {
        public static string DatabaseName = "USUARIO";
        public static string DatabaseValues =
         $@"DOCUMENTO = @DOCUMENTO, 
            TELEFONE1 = @TELEFONE1, 
            TELEFONE2 = @TELEFONE2,
            NOME = @NOME, 
            SOBRENOME = @SOBRENOME, 
            EMAIL = @EMAIL, 
            PASSWORDHASH = @PASSWORDHASH,
            TIPO = @TIPO, 
            CNH = @CNH,
            FOTO = @FOTO";

        public string ID { get; set; }
        public string DOCUMENTO { get; set; }
        public string TELEFONE1 { get; set; }
        public string TELEFONE2 { get; set; }
        public string NOME { get; set; }
        public string SOBRENOME { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORDHASH { get; set; }
        public int TIPO { get; set; }
        public string CNH { get; set; }
        public string FOTO { get; set; }

        public string SENHA 
        {
            get 
            {
                return PASSWORDHASH;
            }
            set
            {
                PASSWORDHASH = PasswordHasher.HashPassword(value);
            }
        }

    }
}
