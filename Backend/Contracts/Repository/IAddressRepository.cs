using Backend.DTO;
using Backend.Entity;

namespace Backend.Contracts.Repository
{
    public interface IAddressRepository
    {
        Task<IEnumerable<AddressDTO>> Get();
        Task<int> Add(AddressDTO address);
        Task<string> Update(AddressEntity address);
        Task<AddressEntity> GetById(int id);
        Task<AddressDTO> GetAllById(int id);
    }
}
