using Dapper;
using MySql.Data.MySqlClient;

namespace Backend.Infrastructure
{
    public class Connection
    {
        protected string connectionString = "Server=localhost;Database=MovEasy;User=root;Password=root;";

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
