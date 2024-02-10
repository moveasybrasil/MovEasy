using Backend.Contracts.Repository;
using Backend.Converter;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using Dapper;

namespace Backend.Repository
{
    public class ServiceRepository : Connection, IServiceRepository
    {
        public async Task Add(ServiceDTO service, string email, int AddressId, int AddressId1)
        {
            string sql = @"
                INSERT INTO Service (
                        Terms,
                        Description,
                        OriginDescription,
                        Status, 
                        DestinationDescription, 
                        Date,
                        Obs,
                        Address_Id,
                        Address_Id1,
                        User_Id,
                        User_Id1,
                        Price
                    ) VALUE (
                        @Terms,
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
                        @Price
                    )
            ";

            int userId = await GetUserIdFromEmail(email);

            int price = new Random().Next(10000, 100000);

            ServiceEntity serviceEntity = await ServiceConverter.Convert(service, AddressId, AddressId1, userId, price);

            await Execute(sql, serviceEntity);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM Service WHERE Id = @id";

            await Execute(sql, new { id });
        }

        public async Task<IEnumerable<ServiceEntity>> Get()
        {
            string sql = "SELECT * FROM Service";
            return await GetConnection().QueryAsync<ServiceEntity>(sql);
        }

        public async Task<ServiceEntity> GetById(int id)
        {
            string sql = "SELECT * FROM Service WHERE Id = @id";
            return await GetConnection().QueryFirstAsync<ServiceEntity>(sql, new { id });
        }

        public async Task<IEnumerable<ServiceEntity>> GetAllOpenServices()
        {
            string sql = "SELECT * FROM Service WHERE Status = 0";
            return (IEnumerable<ServiceEntity>)await GetConnection().QueryAsync<ServiceEntity>(sql);
        }

        public async Task Update(ServiceEntity service)
        {
            string sql = @"
                UPDATE Service 
                    SET 
                        Terms = @Terms,
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

        public async Task<IEnumerable<ServiceEntity>> GetMyOngoingServices (string email)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE Email = @email";
                int id = await GetConnection().QueryFirstAsync<int>(sql, new { email });

                sql = "SELECT * FROM Service WHERE Status = 1 AND (User_Id = @id OR User_Id1 = @id)";
                return (IEnumerable<ServiceEntity>)await GetConnection().QueryAsync<ServiceEntity>(sql, new { id });
            }
            catch (Exception ex)
            {
                throw new Exception($"Nao foi possivel obter id de usuario. {ex.Message}");
            }
        }

        public async Task<IEnumerable<ServiceEntity>> GetMyClosedServices(string email)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE Email = @email";
                int id = await GetConnection().QueryFirstAsync<int>(sql, new { email });

                sql = "SELECT * FROM Service WHERE Status = 2 AND (User_Id = @id OR User_Id1 = @id)";
                return (IEnumerable<ServiceEntity>)await GetConnection().QueryAsync<ServiceEntity>(sql, new {id});
            }
            catch (Exception ex)
            {
                throw new Exception($"Nao foi possivel obter id de usuario. {ex.Message}");
            }
        }

        private async Task<int> GetUserIdFromEmail(string email)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE Email = @email";
                return await GetConnection().QueryFirstAsync<int>(sql, new { email });
            }
            catch (Exception ex)
            {
                throw new Exception($"Nao foi possivel obter id de usuario. {ex.Message}");
            }
        }
    }
}