using Backend.DTO;
using Backend.Entity;

namespace Backend.Contracts.Repository
{
    public interface ICityRepository
    {
        Task<IEnumerable<CityEntity>> Get();
    }
}
