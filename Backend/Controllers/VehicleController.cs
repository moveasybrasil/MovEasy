using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Backend.Controllers
{

        [ApiController]
        [Route("vehicle")]
        public class VehicleController : ControllerBase
        {
            private readonly IVehicleRepository _vehicleRepository;

            public VehicleController(IVehicleRepository vehicleRepository)
            {
                _vehicleRepository = vehicleRepository;
            }

            [HttpGet]
            [Authorize(Roles = "client, admin, driver")]
            public async Task<IActionResult> Get()
            {
                return Ok(await _vehicleRepository.Get());
            }

            [HttpGet("{licensePlate}")]
            [Authorize(Roles = "client, admin, driver")]
            public async Task<IActionResult> GetByLicensePlate(string licensePlate)
            {
                return Ok(await _vehicleRepository.GetByLicensePlate(licensePlate));
            }

            [HttpDelete]
            [Authorize(Roles = "client, admin, driver")]
            public async Task<IActionResult> Delete(int id)
            {
                await _vehicleRepository.Delete(id);
                return Ok();
            }

            [HttpPost]
            [Authorize(Roles = "client, admin, driver")]
            public async Task<IActionResult> Create(VehicleDTO vehicle)
            {
                await _vehicleRepository.Create(vehicle);
                return Ok();
            }

            [HttpPut]
            [Authorize(Roles = "client, admin, driver")]
            public async Task<IActionResult> Update(VehicleEntity vehicle)
            {
                await _vehicleRepository.Update(vehicle);
                return Ok();
            }

        }
}
