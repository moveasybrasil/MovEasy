using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("/")]
    public class IndexController : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return Ok("Servidor MovEasy");
        }

    }
}
