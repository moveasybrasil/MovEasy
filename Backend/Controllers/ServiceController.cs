using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("service")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepository;

        public ServiceController(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }


        [HttpPost]
        public async Task<IActionResult> Add(ServiceDTO service)
        {
            await _serviceRepository.Add(service);
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
    }
}