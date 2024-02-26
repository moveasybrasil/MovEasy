using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using Dapper;

namespace Backend.Repository
{
    public class VehicleRepository : Connection, IVehicleRepository
    {
        public async Task Create(VehicleDTO vehicle, string email)
        {
            string sql = @" INSERT INTO Vehicle (LicensePlate, Year, Capacity, Name, Colour)
                                          VALUE (@licensePlate, @year, @capacity, @name, @colour)
                          ; SELECT LAST_INSERT_ID();";
            int vehicleId = await GetConnection().QueryFirstAsync<int>(sql, vehicle);

            sql = "SELECT Id FROM User WHERE Email = @email";
            int userId = await GetConnection().QueryFirstAsync<int>(sql, new { email });

            sql = @"INSERT INTO User_Vehicle (User_Id, Vehicle_Id)
                                           VALUE (@userId, @vehicleId)";
            await Execute(sql, new { userId, vehicleId });
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM Vehicle WHERE Id = @id";
            await Execute(sql, new { id });
        }

        public async Task<IEnumerable<VehicleEntity>> Get()
        {
            string sql = "SELECT * FROM Vehicle";
            return await GetConnection().QueryAsync<VehicleEntity>(sql);
        }

        public async Task<VehicleEntity> GetByLicensePlate(string licensePlate)
        {
            string sql = "SELECT * FROM Vehicle WHERE LicensePlate = UPPER(@licensePlate)";
            return await GetConnection().QueryFirstAsync<VehicleEntity>(sql, new { licensePlate });
        }

        public async Task Update(VehicleEntity vehicle, string email)
        {
            try
            {
                string sql = "SELECT Id FROM User WHERE Email = @email";
                int userId = await GetConnection().QueryFirstAsync<int>(sql, new { email });

                sql = "SELECT Vehicle_Id FROM User_Vehicle WHERE User_Id = @userId and Vehicle_Id = @vehicleId";
                int? id = await GetConnection().QueryFirstAsync<int>(sql, new { userId, vehicleId = vehicle.Id });

                if (id != null)
                {
                    sql = @"UPDATE Vehicle
                              SET Name = @Name,
                                  LicensePlate = @licenseplate,
                                  Year = @year,
                                  Capacity = @capacity
                                  Colour = @colour
                              WHERE
                                   Id = @Id
                          ";
                    await Execute(sql, vehicle);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Você não pode editar um veículo que não pertence a você! {ex.Message}");
            }
        }

        public async Task<VehicleDTO> GetInfoFromLicensePlate(string licensePlate)
        {
            return await WebScraper.GetVehicleDataFromLicensePlate(licensePlate);
        }

        public async Task<List<VehicleEntity>> GetById(string email)
        {
            string sql = "SELECT Id FROM User WHERE Email = @email";
            int id = await GetConnection().QueryFirstAsync<int>(sql, new { email });

            sql = "SELECT Vehicle_Id FROM User_Vehicle WHERE User_Id = @id";
            IEnumerable<int> vehicleIds = await GetConnection().QueryAsync<int>(sql, new { id });

            sql = "SELECT * FROM Vehicle WHERE Id = @id";
            List<VehicleEntity> vehicleList = new List<VehicleEntity>();

            foreach (var item in vehicleIds)
            {
                vehicleList.Add(await GetConnection().QueryFirstAsync<VehicleEntity>(sql, new { id = item }));
            }
            return vehicleList;
        }
    }
}