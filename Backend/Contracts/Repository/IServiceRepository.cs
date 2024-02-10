using Backend.DTO;
using Backend.Entity;

namespace Backend.Contracts.Repository
{
    public interface IServiceRepository
    {
        Task Add(ServiceDTO service, string email, int AddressId, int AddressId1);
        Task Update(ServiceEntity service);
        Task Delete(int id);
        Task<ServiceEntity> GetById(int id);
        Task<IEnumerable<ServiceEntity>> Get();
        Task<IEnumerable<ServiceEntity>> GetAllOpenServices();
        Task<IEnumerable<ServiceEntity>> GetMyOngoingServices(string email);
        Task<IEnumerable<ServiceEntity>> GetMyClosedServices(string email);
    }
}