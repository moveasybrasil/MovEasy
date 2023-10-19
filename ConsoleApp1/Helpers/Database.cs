using ConsoleApp1.Entity;
using MySql.Data.MySqlClient;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1.Helpers
{
    public class Database
    {
        private static string server = "localhost";
        private static string database = "MovEasy";
        private static string user = "root";
        private static string pass = "root";
        public static string GetConnectionString()
        {
            string ConnectionString =
                "Server=" + server + ";" +
                "Database=" + database + ";" +
                "User=" + user + ";" +
                "Password=" + pass;
            return ConnectionString;
        }

        protected object Query(string sql, object parameters)
        {
            using (MySqlConnection con = new MySqlConnection(GetConnectionString()))
            {
                return con.Query(sql, parameters);
            }
        }
    }
}
