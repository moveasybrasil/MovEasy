﻿using Microsoft.AspNetCore.Authorization;
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
            await _AddressRepository.Add(address);
            return Ok();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(AddressEntity address)
        {
            await _AddressRepository.Update(address);
            return Ok();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _AddressRepository.GetById(id));
        }
    }
}
