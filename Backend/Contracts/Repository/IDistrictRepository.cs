using Backend.DTO;
using Backend.Entity;

namespace Backend.Contracts.Repository
{
    public interface IDistrictRepository
    {
        Task<IEnumerable<DistrictEntity>> Get();
    }
}
