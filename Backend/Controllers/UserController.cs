using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Repository;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Security.Claims;

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
            try
            {
                return Ok(await _userRepository.Get());
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(UserDTO user)
        {
            try
            {
                await _userRepository.Add(user);
                return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize]
        [Route("photo")]
        public async Task<IActionResult> AddPhoto(IFormFile image)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                string email = identity.FindFirst(ClaimTypes.Email).Value;
                if (email == null) { throw new Exception("Token Invalido."); }

                //Microsoft.Extensions.Primitives.StringValues headerValues;
                // Request.Headers.TryGetValue("Authorization", out headerValues);

                return Ok(await _userRepository.AddPhoto(image.OpenReadStream(), image.FileName, email));
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("photo")]
        public async Task<IActionResult> GetPhoto()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            string email = identity.FindFirst(ClaimTypes.Email).Value;
            if (email == null) { throw new Exception("Token Invalido."); }

            try
            {
                return Ok(await _userRepository.GetUserPhoto(email));
            } catch (Exception ex)
            { 
                return NotFound(ex.Message);
            }
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(UserEntity user)
        {
            try
            {
                await _userRepository.Update(user);
                return Ok();
            } catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize]
        [Route("password")]
        public async Task<IActionResult> UpdatePassword(UserPasswordDTO user)
        {
            try
            {
                await _userRepository.UpdatePassword(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _userRepository.Delete(id);
                return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _userRepository.GetById(id));
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

        [HttpPut]
        [Route("validation/{UUID}")]
        public async Task<IActionResult> ValidateEmail(string UUID)
        {
            try
            {
                return Ok(await _userRepository.ValidateEmail(UUID));
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
                return BadRequest(Ex.Message);
            }
        }

        [HttpGet]
        [Route("recovery/{UUID}")]
        public async Task<IActionResult> ValidateUUID(string UUID)
        {
            try
            {
                return Ok(await _userRepository.ValidateUUID(UUID));
            } catch (Exception Ex)
            {
                return BadRequest(Ex.Message);
            }
        }

        [HttpPut]
        [Route("recovery")]
        public async Task<IActionResult> RenewPassword(UserPasswordRecoveryDTO user)
        {
            try
            {
                return Ok(await _userRepository.RenewPassword(user));
            } catch (Exception Ex)
            {
                return Forbid(Ex.Message);
            }
        }
    }
}
