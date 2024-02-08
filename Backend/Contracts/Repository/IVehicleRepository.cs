using Backend.DTO;
using Backend.Entity;

namespace Backend.Contracts.Repository
{
    public interface IVehicleRepository
    {
        Task Create(VehicleDTO vehicle, string email);
        Task Update(VehicleEntity vehicle, string email);
        Task Delete(int id);
        Task<VehicleEntity> GetByLicensePlate(string licensePlate);
        Task<IEnumerable<VehicleEntity>> Get();
        Task<VehicleDTO> GetInfoFromLicensePlate(string licensePlate);
        Task<List<VehicleEntity>> GetById(string email);
    }
}
