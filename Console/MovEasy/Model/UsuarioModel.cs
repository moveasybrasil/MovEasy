using MovEasy.Entity;
using MovEasy.Helpers;
using MovEasy.Interface;
using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovEasy.Model
{
    internal class UsuarioModel : Database, ICrud
    {
        public static void Setup()
        {
            SQLExecute(
                $@"CREATE TABLE IF NOT EXISTS {UsuarioEntity.DatabaseName} ( 
                        ID INT NOT NULL AUTO_INCREMENT,
                        DOCUMENTO VARCHAR(45) NOT NULL,
                        TELEFONE1 VARCHAR(11) NOT NULL,
                        TELEFONE2 VARCHAR(11),
                        NOME VARCHAR(255) NOT NULL,
                        SOBRENOME VARCHAR(255) NOT NULL,
                        EMAIL VARCHAR(255) NOT NULL,
                        PASSWORDHASH VARCHAR(255) NOT NULL,
                        TIPO INT NOT NULL,
                        CNH VARCHAR(45),
                        FOTO VARCHAR(255),
                        PRIMARY KEY (ID)
                )"
            );
        }

        public static void Create()
        {
            UsuarioEntity user = EditUser(new UsuarioEntity());

            SQLExecute(
                $"INSERT INTO {UsuarioEntity.DatabaseName} SET {UsuarioEntity.DatabaseValues}",
                user
            );

        }

        public static void Read()
        {
            int quantidade = MostrarUsuarios();

            Menu.GetInput($"Mostrando {quantidade} usuário(s). Pressione uma tecla para continuar.");
        }

        public static void Update()
        {
            try
            {
                MostrarUsuarios();

                int ID = GetID("Digite o ID para atualizar: ");
                bool isLoginValid = VerifyUser(ID);
                if (!isLoginValid) return;

                string sql = $"SELECT * FROM {UsuarioEntity.DatabaseName} WHERE ID = @ID";
                var parameters = new { ID };

                UsuarioEntity user = SQLConnection().QueryFirst<UsuarioEntity>(sql, parameters);
                    
                Console.Clear();

                user = EditUser(user);

                SQLExecute(
                    $"UPDATE {UsuarioEntity.DatabaseName} SET {UsuarioEntity.DatabaseValues} WHERE ID = @ID",
                    user
                );

                Menu.GetInput("Usuario Atualizado! Pressione uma tecla para continuar.");

            }
            catch (Exception ex)
            {
                Menu.GetInput($"ID Inválido! Pressione uma tecla para continuar.");
            }
        }

        public static void Delete()
        {
            try
            {
                MostrarUsuarios();

                int ID = GetID("Digite o ID para exclusão: ");
                bool isLoginValid = VerifyUser(ID);
                if (!isLoginValid) return;

                SQLExecute(
                    $"DELETE FROM {UsuarioEntity.DatabaseName} WHERE ID = @ID",
                    new { ID }
                );

                Menu.GetInput("Usuario Deletado! Pressione uma tecla para continuar.");
            }
            catch (Exception ex)
            {
                Menu.GetInput($"Erro: {ex.Message}");
            }
        }

        private static bool VerifyUser(int ID)
        {
            string sql = $"SELECT * FROM {UsuarioEntity.DatabaseName} WHERE ID = @ID";
            var parameters = new { ID };

            UsuarioEntity user = SQLConnection().QueryFirst<UsuarioEntity>(sql, parameters);

            bool login = PasswordHasher.VerifyPassword(user.EMAIL, Menu.GetPasswordInput("Digite sua senha: "));

            if (login) return true;

            Console.Clear();
            Console.WriteLine("Senha Inválida! Pressione uma tecla para continuar.");
            Console.ReadLine();
            return false;
            
        }

        public static UsuarioEntity EditUser(UsuarioEntity user)
        {
            Console.Clear();
            user.EMAIL = Menu.GetInput("Digite seu email");
            user.SENHA = Menu.GetPasswordInput("Digite sua senha: ");
            user.NOME = Menu.GetInput("Digite seu Nome");
            user.SOBRENOME = Menu.GetInput("Digite seu Sobrenome");
            user.DOCUMENTO = Menu.GetInput("Digite o Documento");
            user.TELEFONE1 = Menu.GetInput("Digite o Telefone");
            user.TIPO = Convert.ToInt32(Menu.GetInput("Digite seu perfil\n1-Contratante\n2-Motorista"));

            return user;
        }

        public static int GetID(string msg = "Digite um ID: ")
        {
            Console.Write(msg);
            int ID;
            try
            {
                ID = Convert.ToInt32(Console.ReadLine());
            }
            catch (Exception ex)
            {
                ID = -1;
            }
            return ID;
        }

        public static int MostrarUsuarios()
        {
            string sql = $"SELECT * FROM {UsuarioEntity.DatabaseName}";

            IEnumerable<UsuarioEntity> users = SQLConnection().Query<UsuarioEntity>(sql);

            Console.Clear();
            foreach (UsuarioEntity user in users)
            {
                Console.WriteLine($"[{user.ID}] {user.NOME} - {user.EMAIL} - {user.TELEFONE1} - {user.DOCUMENTO}");
            }
            Menu.DivisoriaMenu();
            return users.Count();
        }

    }
}
