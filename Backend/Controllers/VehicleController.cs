using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

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
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok(await _vehicleRepository.Get());
        }

        [HttpGet("placa/{licensePlate}")]
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
        [Authorize]
        public async Task<IActionResult> Create(VehicleDTO vehicle)
        {
            string email = Authentication.GetClaimValueFromToken(HttpContext, ClaimTypes.Email);
            await _vehicleRepository.Create(vehicle, email);
            return Ok();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(VehicleEntity vehicle)
        {
            try
            {
                string email = Authentication.GetClaimValueFromToken(HttpContext, ClaimTypes.Email);
                await _vehicleRepository.Update(vehicle, email);
                return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("{licensePlate}")]
        public async Task<IActionResult> GetInfoFromLicensePlate(string licensePlate)
        {
            try
            {
                return Ok(await _vehicleRepository.GetInfoFromLicensePlate(licensePlate));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("id")]
        public async Task<IActionResult> GetAllUserVehicle()
        {
            try
            {
                string email = Authentication.GetClaimValueFromToken(HttpContext, ClaimTypes.Email);
                return Ok(await _vehicleRepository.GetById(email));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
