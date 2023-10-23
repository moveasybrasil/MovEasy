using ConsoleApp1.Entity;
using ConsoleApp1.Helpers;
using ConsoleApp1.Interface;
using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1.Model
{
    internal class UsuarioModel : Database, ICrud
    {
        public static void Setup()
        {
            //using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
            //{
            //    string sql = $"DROP TABLE IF EXISTS {UsuarioEntity.DatabaseName}";
            //    con.Execute(sql);
            //}

            using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
            {
                string sql = $@"CREATE TABLE IF NOT EXISTS {UsuarioEntity.DatabaseName} ( 
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
                )";
                con.Execute(sql);
            }
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

                UsuarioEntity user;

                string sql = $"SELECT * FROM {UsuarioEntity.DatabaseName} WHERE ID = @ID";
                var parameters = new { ID };

                user = SQLConnection().QueryFirst<UsuarioEntity>(sql, parameters);

                Console.Clear();
                Console.WriteLine($"Digite o novo email <{user.EMAIL}>");
                user.EMAIL = Console.ReadLine();

                Console.WriteLine($"Digite uma nova senha.");
                user.PASSWORDHASH = PasswordHasher.HashPassword(Console.ReadLine());

                sql = $"UPDATE {UsuarioEntity.DatabaseName} SET {UsuarioEntity.DatabaseValues} WHERE ID = @ID";

                SQLExecute(sql, user);

                Console.WriteLine("Usuario Atualizado! Pressione uma tecla para continuar.");
                Console.ReadLine();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"ID Inválido! Pressione uma tecla para continuar.");
                Console.ReadLine();
            }
        }

        public static void Delete()
        {
            try
            {
                MostrarUsuarios();

                int ID = GetID("Digite o ID para exclusão: ");

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

        public static UsuarioEntity EditUser(UsuarioEntity user)
        {
            user.EMAIL = Menu.GetInput("Digite seu email");
            user.SENHA = Menu.GetInput("Digite sua Senha");
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
            string sql = "SELECT * FROM " + UsuarioEntity.DatabaseName;

            IEnumerable<UsuarioEntity> users = SQLConnection().Query<UsuarioEntity>(sql);

            foreach (UsuarioEntity user in users)
            {
                Console.WriteLine($"[{user.ID}] {user.NOME} - {user.EMAIL} - {user.TELEFONE1} - {user.DOCUMENTO}");
            }

            return users.Count();
        }

    }
}
