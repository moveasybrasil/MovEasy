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
            using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
            {
                string sql = "DROP TABLE IF EXISTS " + UsuarioEntity.DatabaseName; ;
                con.Execute(sql);
            }

            using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
            {
                string sql = "CREATE TABLE " + UsuarioEntity.DatabaseName +
                    " ( " +
                        "ID INT NOT NULL AUTO_INCREMENT, " +
                        "EMAIL VARCHAR(255) NOT NULL, " +
                        "PASSWORDHASH VARCHAR(255) NOT NULL, " +
                        "PASSWORDSALT VARCHAR(255) NOT NULL, " +
                        "NOME VARCHAR(255), " +
                        "TELEFONE VARCHAR(255), " +
                        "ENDERECO VARCHAR(255)," +
                        "PRIMARY KEY (ID)" +
                    ")";
                con.Execute(sql);
            }
        }

        public static void Create()
        {
            UsuarioEntity user = new UsuarioEntity();
            user.Popular();

            using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
            {
                string sql = "INSERT INTO " + UsuarioEntity.DatabaseName + " SET " + UsuarioEntity.DatabaseValues;
                con.Execute(sql, user);
            }
        }

        public static void Delete()
        {
            try
            {
                MostrarUsuarios();

                int ID = GetID("Digite o ID para exclusão: ");

                using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
                {
                    string sql = "DELETE FROM " + UsuarioEntity.DatabaseName + " WHERE ID = @ID";
                    var parameters = new { ID };
                    con.Execute(sql, parameters);

                }

                Console.WriteLine("Usuario Deletado! Pressione uma tecla para continuar.");
                Console.ReadLine();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro: {ex.Message}");
                Console.ReadLine();
            }
        }

        public static void Read()
        {
            int quantidade = MostrarUsuarios();

            Console.WriteLine($"Mostrando {quantidade} usuario(s). Pressione uma tecla para continuar.");
            Console.ReadLine();
        }

        public static void Update()
        {
            try
            {
                MostrarUsuarios();

                int ID = GetID("Digite o ID para atualizar: ");

                UsuarioEntity user;

                using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
                {
                    string sql = "SELECT * FROM " + UsuarioEntity.DatabaseName + " WHERE ID = @ID";
                    var parameters = new { ID };
                    user = con.QueryFirst<UsuarioEntity>(sql, parameters);
                }

                user.Atualizar();

                using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
                {
                    string sql = "UPDATE " + UsuarioEntity.DatabaseName + " SET " + UsuarioEntity.DatabaseValues + " WHERE ID = @ID";
                    con.Execute(sql, user);
                }

                Console.WriteLine("Usuario Atualizado! Pressione uma tecla para continuar.");
                Console.ReadLine();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"ID Inválido! Pressione uma tecla para continuar.");
                Console.ReadLine();
            }
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
            using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
            {
                string sql = "SELECT * FROM " + UsuarioEntity.DatabaseName;
                IEnumerable<UsuarioEntity> usuarios = con.Query<UsuarioEntity>(sql);

                foreach (UsuarioEntity user in usuarios)
                {
                    user.Mostrar();
                }

                return usuarios.Count();
            }
        }

    }
}
