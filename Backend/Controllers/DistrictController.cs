using Microsoft.AspNetCore.Mvc;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Repository;

namespace Backend.Controllers
{
    [ApiController]
    [Route("district")]
    public class DistrictController : ControllerBase
    {
        private readonly IDistrictRepository _DistrictRepository;

        public DistrictController(IDistrictRepository DistrictRepository)
        {
            _DistrictRepository = DistrictRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _DistrictRepository.Get());
        }
    }
}
