using Backend.DTO;
using Backend.Entity;

namespace Backend.Contracts.Repository
{
    public interface IVehicleInfoRepository
    {
        Task<VehicleEntity> Register(VehicleEntity entity);      
        Task<VehicleEntity> GetInfoFromPlate(string plate);        
    }
}
