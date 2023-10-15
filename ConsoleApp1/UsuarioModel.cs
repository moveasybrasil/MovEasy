using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class UsuarioModel : ICrud
    {
        public static void Create()
        {
            Usuario user = new Usuario();

            using (MySqlConnection con = new MySqlConnection(Database.GetConnectionString()))
            {
                string sql = "INSERT INTO "+Usuario.DatabaseName+" SET " + Usuario.DatabaseValues;
                con.Execute(sql, user);
            }
        }

        public static void Delete()
        {
            Read();

            int ID = GetID("Digite o ID para exclusão: ");

            using (MySqlConnection con = new MySqlConnection(Database.GetConnectionString()))
            {
                string sql = "DELETE FROM " + Usuario.DatabaseName + " WHERE ID = @ID";
                var parameters = new { ID = ID };
                con.Execute(sql, parameters);

            }

            Console.WriteLine("Usuario Deletado! Pressione uma tecla para continuar.");
            Console.ReadLine();
        }

        public static void Read()
        {
            using (MySqlConnection con = new MySqlConnection(Database.GetConnectionString()))
            {
                string sql = "SELECT * FROM " + Usuario.DatabaseName;
                IEnumerable<Usuario> usuarios = con.Query<Usuario>(sql);

                foreach(Usuario user in usuarios)
                {
                    user.Mostrar();
                }
            }
        }

        public static void Update()
        {
            Read();

            int ID = GetID("Digite o ID para atualizar: ");

            Usuario user;

            using (MySqlConnection con = new MySqlConnection(Database.GetConnectionString()))
            {
                string sql = "SELECT * FROM " + Usuario.DatabaseName + " WHERE ID = @ID";
                var parameters = new { ID = ID };
                user = con.QueryFirst<Usuario>(sql, parameters);
            }

            user.Atualizar();

            using (MySqlConnection con = new MySqlConnection(Database.GetConnectionString()))
            {
                string sql = "UPDATE "+Usuario.DatabaseName+" SET "+Usuario.DatabaseValues+" WHERE ID = @ID";
                con.Execute(sql, user);
            }

            Console.WriteLine("Usuario Atualizado! Pressione uma tecla para continuar.");
            Console.ReadLine();
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
    }
}
