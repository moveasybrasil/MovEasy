using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("vehicle/info")]
    public class VehicleInfoController : ControllerBase
    {
        private readonly IVehicleInfoRepository _vehicleInfoRepository;

        public VehicleInfoController(IVehicleInfoRepository vehicleInfoRepository)
        {
            _vehicleInfoRepository = vehicleInfoRepository;
        }
        
        [HttpGet]
        // trocar AllowAnonymous para Authorize para permitir acesso a rota apenas via token login
        [AllowAnonymous]
        [Route("{plate}")]
        public async Task<IActionResult> GetInfoFromLicensePlate(string plate)
        {
            try
            {
                return Ok(await _vehicleInfoRepository.GetInfoFromPlate(plate));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        // trocar AllowAnonymous para Authorize para permitir acesso a rota apenas via token login
        [AllowAnonymous]
        [Route("/vehicle/register")]
        public async Task<IActionResult> Create(VehicleDTO vehicle){
            try{

                 // await _vehicleInfoRepository.Register(vehicle);
                
                return Ok(vehicle);

            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
        

    }
}
