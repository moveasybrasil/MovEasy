using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Repository;

namespace Backend.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userRepository.Get());
        }

        [HttpPost]
        public async Task<IActionResult> Add(UserDTO user)
        {
            await _userRepository.Add(user);
            return Ok();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(UserEntity user)
        {
            await _userRepository.Update(user);
            return Ok();
        }

        [HttpPatch]
        [Authorize]
        public async Task<IActionResult> UpdatePassword(UserPasswordDTO user)
        {
            try
            {
                await _userRepository.UpdatePassword(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        [HttpDelete]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userRepository.Delete(id);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _userRepository.GetById(id));
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserLoginDTO user)
        {
            try
            {
                return Ok(await _userRepository.Login(user));
            } catch(Exception Ex)
            {
                return Unauthorized(Ex.Message);
            }
        }

        [HttpPost]
        [Route("recovery")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            try
            {
                return Ok(await _userRepository.ForgotPassword(email));
            } catch (Exception Ex)
            {
                return Unauthorized(Ex.Message);
            }
        }

        [HttpPatch]
        [Route("recovery")]
        public async Task<IActionResult> RenewPassword(UserPasswordRecoveryDTO user)
        {
            try
            {
                return Ok(await _userRepository.RenewPassword(user));
            } catch (Exception Ex)
            {
                return Forbid();
            }
        }
    }
}
