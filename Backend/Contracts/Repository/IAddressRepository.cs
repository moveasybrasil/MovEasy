using Backend.DTO;
using Backend.Entity;

namespace Backend.Contracts.Repository
{
    public interface IAddressRepository
    {
        Task<IEnumerable<AddressEntity>> Get();
        Task<string> Add(AddressDTO address);
        Task Update(AddressEntity address);
        Task<AddressEntity> GetById(int id);
    }
}
