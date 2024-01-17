using Dapper;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;

namespace Backend.Repository
{
    public class DistrictRepository : Connection, IDistrictRepository
    {
        public async Task<IEnumerable<DistrictEntity>> Get()
        {
            string sql = "SELECT * FROM DISTRICT";
            return await GetConnection().QueryAsync<DistrictEntity>(sql);
        }
    }
}
