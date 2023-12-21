using Dapper;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;

namespace Backend.Repository
{
    public class StateRepository : Connection, IStateRepository
    {
        public async Task<IEnumerable<StateEntity>> Get()
        {
            string sql = "SELECT * FROM STATE";
            return await GetConnection().QueryAsync<StateEntity>(sql);
        }
    }
}
