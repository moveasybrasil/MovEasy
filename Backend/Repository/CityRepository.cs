using Dapper;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;

namespace Backend.Repository
{
    public class CityRepository : Connection, ICityRepository
    {
        public async Task<IEnumerable<CityEntity>> Get()
        {
            string sql = "SELECT * FROM CITY";
            return await GetConnection().QueryAsync<CityEntity>(sql);
        }
    }
}
