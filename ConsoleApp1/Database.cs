using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class Database
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
    }
}
