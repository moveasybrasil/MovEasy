using Microsoft.AspNetCore.Mvc;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Repository;

namespace Backend.Controllers
{
    [ApiController]
    [Route("city")]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository _CityRepository;

        public CityController(ICityRepository CityRepository)
        {
            _CityRepository = CityRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _CityRepository.Get());
        }
    }
}
