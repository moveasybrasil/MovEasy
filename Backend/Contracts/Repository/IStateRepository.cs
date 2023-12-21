using Backend.DTO;
using Backend.Entity;

namespace Backend.Contracts.Repository
{
    public interface IStateRepository
    {
        Task<IEnumerable<StateEntity>> Get();
    }
}
