using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using Dapper;

namespace Backend.Repository
{
    public class ServiceRepository : Connection, IServiceRepository
    {
        public async Task Add(ServiceDTO service)
        {
            string sql = @"
                INSERT INTO SERVICE (
                        Id,
                        Description,
                        OriginDescription,
                        Status, 
                        DestinationDescription, 
                        Date,
                        Obs,
                        Address_Id,
                        Address_Id1,
                        User_Id,
                        User_Id1
                    ) VALUE (
                        @Id,
                        @Description,
                        @OriginDescription,
                        @Status,
                        @DestinationDescription, 
                        @Date,
                        @Obs,
                        @Address_Id,
                        @Address_Id1,
                        @User_Id,
                        @User_Id1
                    )
            ";

            await Execute(sql, service);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM SERVICE WHERE Id = @id";

            await Execute(sql, new { id });
        }

        public async Task<IEnumerable<ServiceEntity>> Get()
        {
            string sql = "SELECT * FROM SERVICE";
            return await GetConnection().QueryAsync<ServiceEntity>(sql);
        }

        public async Task<ServiceEntity> GetById(int id)
        {
            string sql = "SELECT * FROM SERVICE WHERE Id = @id";
            return await GetConnection().QueryFirstAsync<ServiceEntity>(sql, new { id });
        }

        public async Task Update(ServiceEntity service)
        {
            string sql = @"
                UPDATE SERVICE 
                    SET 
                        Id = @Id,
                        Description = @Description,
                        OriginDescription = @OriginDescription,
                        Status = @Status, 
                        DestinationDescription = @DestinationDescription, 
                        Date = @Date,
                        Obs = @Obs,
                        Address_Id = @Address_Id,
                        Address_Id1 = @Address_Id1,
                        User_Id = @User_Id,
                        User_Id1 = @User_Id1
                    WHERE
                        Id = @Id
            ";

            await Execute(sql, service);
        }
    }
}