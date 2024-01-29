using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Repository;

namespace Backend.Controllers
{
    [ApiController]
    [Route("adress")]
    public class AddressController : ControllerBase
    {
        private readonly IAddressRepository _AddressRepository;

        public AddressController(IAddressRepository addressRepository)
        {
            _AddressRepository = addressRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok(await _AddressRepository.Get());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add(AddressDTO address)
        {
            try
            {
                return Ok(await _AddressRepository.Add(address));
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(AddressEntity address)
        {
            try
            {
                return Ok(await _AddressRepository.Update(address));
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _AddressRepository.GetById(id));
            }
            catch (Exception ex)
            {
                return BadRequest($"Não encontrei o endereço no id fornecido. {ex.Message}");
            }
        }

        [HttpGet("{id}/all")]
        [Authorize]
        public async Task<IActionResult> GetallById(int id)
        {
            try
            {
                return Ok(await _AddressRepository.GetAllById(id));
            }
            catch (Exception ex)
            {
                return BadRequest($"Não encontrei o endereço no id fornecido. {ex.Message}");
            }
        }
    }
}
