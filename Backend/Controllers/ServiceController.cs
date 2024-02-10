using Backend.Contracts.Repository;
using Backend.Converter;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using Backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("service")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepository;
        private readonly IAddressRepository _addressRepository;

        public ServiceController(IServiceRepository serviceRepository, IAddressRepository addressRepository)
        {
            _serviceRepository = serviceRepository;
            _addressRepository = addressRepository;
        }


        [HttpPost]
        public async Task<IActionResult> Add(ServiceDTO service)
        {
            string email = Authentication.GetClaimValueFromToken(HttpContext, ClaimTypes.Email);

            int addressId = await _addressRepository.Add(service.Address_Id);
            int addressId1 = await _addressRepository.Add(service.Address_Id1);

            await _serviceRepository.Add(service, email, addressId, addressId1);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _serviceRepository.Delete(id);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _serviceRepository.Get());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _serviceRepository.GetById(id));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ServiceEntity service)
        {
            await _serviceRepository.Update(service);
            return Ok();
        }

        [HttpGet]
        [Authorize]
        [Route("open")]
        public async Task<IActionResult> GetAllOpenServices()
        {
            try
            {
                return Ok(await _serviceRepository.GetAllOpenServices());
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("ongoing")]
        public async Task<IActionResult> GetMyOngoingServices()
        {
            try
            {
                string email = Authentication.GetClaimValueFromToken(HttpContext, ClaimTypes.Email);
                return Ok(await _serviceRepository.GetMyOngoingServices(email));
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("closed")]
        public async Task<IActionResult> GetMyClosedServices()
        {
            try
            {
                string email = Authentication.GetClaimValueFromToken(HttpContext, ClaimTypes.Email);
                return Ok(await _serviceRepository.GetMyClosedServices(email));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}