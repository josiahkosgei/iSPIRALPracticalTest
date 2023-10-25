using iSPIRALPracticalTest.API.Helpers;
using iSPIRALPracticalTest.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Numerics;
using System.Text.Json;

namespace iSPIRALPracticalTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FactorialController : ControllerBase
    {
        [HttpGet("{value}")]
        [ProducesResponseType(typeof(BaseResponse<string>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<string> Get(int value)
        {
            try
            {
               var result= ComputeFactorialHelper.ComputeFactorial(value);
                BaseResponse<string> resp = new BaseResponse<string> { StatusCode = ResponseEnum.Successful.EnumFormat().code, Message = ResponseEnum.Successful.EnumFormat().desc, ResponseObject = result };
                return Ok(resp);
            }
            catch (Exception ex)
            {
                var resp = new BaseResponse<string> { StatusCode = ResponseEnum.UnSuccessful.EnumFormat().code, Message = ex.Message };

                return BadRequest(resp);
            }
        }
    }
}
