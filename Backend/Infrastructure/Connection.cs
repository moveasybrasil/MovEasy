using Dapper;
using MySql.Data.MySqlClient;

namespace Backend.Infrastructure
{
    public class Connection
    {
        //protected string connectionString = "Server=localhost;Database=MovEasy;User=root;Password=root;";
        protected string connectionString = "Server=mysql-1e882686-moveasy.a.aivencloud.com;Port=11197;Database=MovEasy;User=avnadmin;Password=AVNS_2OtrV0hmtp8IMkJR5do;SslMode=Preferred;";

        protected MySqlConnection GetConnection()
        {
            return new MySqlConnection(connectionString);
        }

        protected async Task<int> Execute(string sql, object obj)
        {
            using (MySqlConnection con = GetConnection())
            {
                return await con.ExecuteAsync(sql, obj);
            }
        }
    }
}
