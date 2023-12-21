using Microsoft.AspNetCore.Mvc;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Repository;

namespace Backend.Controllers
{
    [ApiController]
    [Route("state")]
    public class StateController : ControllerBase
    {
        private readonly IStateRepository _StateRepository;

        public StateController(IStateRepository StateRepository)
        {
            _StateRepository = StateRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _StateRepository.Get());
        }
    }
}
