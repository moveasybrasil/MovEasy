using Backend.Contracts.Repository;
using Backend.Converter;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using Dapper;
using System.Text.Json;

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
                        @User_Id1,
                        @Price
                    )
            ";

            int userId = await GetUserIdFromEmail(email);

            int price = await GetPriceFromDistance(AddressId, AddressId1);

            ServiceEntity serviceEntity = await ServiceConverter.Convert(service, AddressId, AddressId1, userId, price);

            await Execute(sql, serviceEntity);
        }

        private async Task<int> GetPriceFromDistance(int AddressId, int AddressId1)
        {
            int value;
            try
            { 
                int pricePerKm = 800; // Centavos

                int distance = (int)Math.Ceiling(await GetDistanceFromAddresses(AddressId, AddressId1));

                value = pricePerKm * distance;
            } catch (Exception ex)
            {
                value = new Random().Next(10000, 100000);
            }
            return value;
        }

        private async Task<double> GetDistanceFromAddresses(int AddressId, int AddressId1)
        {
            string address = await GetAddressFromAddressId(AddressId);
            string address1 = await GetAddressFromAddressId(AddressId1);

            var url = new Uri($"http://dev.virtualearth.net/REST/v1/Routes?waypoint.1={address}&waypoint.2={address1}&distanceUnit=km&o=json&key={Configuration.BingKey}");

            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);
            BingMapsResponseDTO result = JsonSerializer.Deserialize<BingMapsResponseDTO>(await response.Content.ReadAsStringAsync());

            return result.resourceSets[0].resources[0].travelDistance;

            int travelTime = result.resourceSets[0].resources[0].travelDuration;
        }

        private async Task<string> GetAddressFromAddressId(int id)
        {
            string sql = @"SELECT
                            CONCAT(Address.Street, ' ', Address.Number, ', ', District.Name, ', ', City.Name, ', ', State.FU) AS FullAddress
                        FROM
                            Address
                            INNER JOIN District ON Address.District_Id = District.Id
                            INNER JOIN City ON District.City_Id = City.Id
                            INNER JOIN State ON City.State_Id = State.Id
                        WHERE
                            Address.Id = @id
            ";

            return await GetConnection().QueryFirstAsync<string>(sql, new {id});
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

        public async Task<IEnumerable<ServiceReturnDTO>> GetAllOpenServices()
        {
            string sql = "SELECT * FROM Service WHERE Status = 0";
            IEnumerable<ServiceEntity> ServiceEntityList = (IEnumerable<ServiceEntity>)await GetConnection().QueryAsync<ServiceEntity>(sql);

            return await GetServiceReturnFromEntity(ServiceEntityList);
        }

        public async Task<IEnumerable<ServiceReturnDTO>> GetMyOngoingServices (string email)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE Email = @email";
                int id = await GetConnection().QueryFirstAsync<int>(sql, new { email });

                sql = "SELECT * FROM Service WHERE Status = 1 AND (User_Id = @id OR User_Id1 = @id)";
                IEnumerable<ServiceEntity> ServiceEntityList = (IEnumerable<ServiceEntity>)await GetConnection().QueryAsync<ServiceEntity>(sql, new { id });

                return await GetServiceReturnFromEntity(ServiceEntityList);
            }
            catch (Exception ex)
            {
                throw new Exception($"Nao foi possivel obter id de usuario. {ex.Message}");
            }
        }

        public async Task<IEnumerable<ServiceReturnDTO>> GetMyClosedServices(string email)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE Email = @email";
                int id = await GetConnection().QueryFirstAsync<int>(sql, new { email });

                sql = "SELECT * FROM Service WHERE Status = 2 AND (User_Id = @id OR User_Id1 = @id)";
                IEnumerable<ServiceEntity> ServiceEntityList = (IEnumerable<ServiceEntity>)await GetConnection().QueryAsync<ServiceEntity>(sql, new {id});

                return await GetServiceReturnFromEntity(ServiceEntityList);
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

        private async Task<IEnumerable<ServiceReturnDTO>> GetServiceReturnFromEntity(IEnumerable<ServiceEntity> ServiceEntityList)
        {
            List<ServiceReturnDTO> ServiceReturnDTOList = new List<ServiceReturnDTO>();
            foreach (var item in ServiceEntityList)
            {
                AddressDTO address = await GetAddressDtoFromId(item.Address_Id);
                AddressDTO address1 = await GetAddressDtoFromId(item.Address_Id1);
                ServiceReturnDTOList.Add(await ServiceConverter.Deconvert(item, address, address1));
            }
            return ServiceReturnDTOList;
        }

        private async Task<AddressDTO> GetAddressDtoFromId (int id)
        {
            string sql = @"SELECT
                    Address.Street AS Street,
                    Address.PostalCode AS PostalCode,
                    Address.Number AS Number,
                    Address.Address2 AS Address2,
                    District.Name AS District,
                    City.Name AS City,
                    State.FU AS FU
                FROM
                    Address
                    INNER JOIN District ON Address.District_Id = District.Id
                    INNER JOIN City ON District.City_Id = City.Id
                    INNER JOIN State ON City.State_Id = State.Id
                WHERE
                    Address.Id = @id
            ";
            return await GetConnection().QueryFirstAsync<AddressDTO>(sql, new { id });
        }
    }
}