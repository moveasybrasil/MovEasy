using Backend.DTO;
using Backend.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("support")]
    public class SupportController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Get(SupportDTO support)
        {
            try
            {
                Email email = new Email();
                return Ok(await email.SendEmail(
                    "noreply.moveasy@gmail.com", 
                    support.Subject, 
                    $"Email de {support.Name} [{support.Email}]\n\n{support.Body}"
                ));
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
