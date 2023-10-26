using AutoMapper;
using iSPIRALPracticalTest.API.Extensions;
using iSPIRALPracticalTest.API.Models;
using iSPIRALPracticalTest.Data.Entities;
using iSPIRALPracticalTest.Data.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace iSPIRALPracticalTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        protected readonly ILogger<PaymentsController> _logger;
        private readonly IPaymentService _paymentService;
        private readonly IMapper _mapper;

        public PaymentsController(ILogger<PaymentsController> logger, IPaymentService paymentService, IMapper mapper)
        {
            _logger = logger;
            _paymentService = paymentService;
            _mapper = mapper;
        }

        // GET: api/<PaymentsController>
        [HttpGet]
        [ProducesResponseType(typeof(BaseResponse<List<PaymentDto>>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<PaymentDto>>> GetAll()
        {
            try
            {
                List<Payment> paymentList = (List<Payment>)await _paymentService.GetAllAsync();
                List<PaymentDto> mappedPayments = _mapper.Map<IList<PaymentDto>>(paymentList).ToList();
                BaseResponse<List<PaymentDto>> response = new BaseResponse<List<PaymentDto>> { StatusCode = ResponseEnum.Successful.EnumFormat().code, Message = ResponseEnum.Successful.EnumFormat().desc, ResponseObject = mappedPayments };
                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new BaseResponse<List<PaymentDto>> { StatusCode = ResponseEnum.UnSuccessful.EnumFormat().code, Message = ex.Message, ResponseObject = null };

                return BadRequest(response);
            }
        }

        // GET api/<PaymentsController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<PaymentDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PaymentDto>> GetAsync(int id)
        {
            try
            {
                Payment payment = await _paymentService.GetAsync(id);
                PaymentDto mappedPayment = _mapper.Map<PaymentDto>(payment);
                BaseResponse<PaymentDto> response = new BaseResponse<PaymentDto> { StatusCode = ResponseEnum.Successful.EnumFormat().code, Message = ResponseEnum.Successful.EnumFormat().desc, ResponseObject = mappedPayment };
                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new BaseResponse<PaymentDto> { StatusCode = ResponseEnum.UnSuccessful.EnumFormat().code, Message = ex.Message, ResponseObject = null };

                return BadRequest(response);
            }
        }

        // POST api/<PaymentsController>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<PaymentDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PaymentDto>> PostAsync([FromBody] Dictionary<string, object> valueInput)
        {
            try
            {
                var paymentDto = valueInput.CustomDeserialize<CreatePaymentDto>();
                var paymentEntity = _mapper.Map<Payment>(paymentDto);
                paymentEntity.payment_date = DateTime.Now.ToString();
                paymentEntity.payment_status = "pending";
                paymentEntity = await _paymentService.AddAsync(paymentEntity);

                var mappedPayment = _mapper.Map<PaymentDto>(paymentEntity);
                BaseResponse<PaymentDto> response = new BaseResponse<PaymentDto> { StatusCode = ResponseEnum.Successful.EnumFormat().code, Message = ResponseEnum.Successful.EnumFormat().desc, ResponseObject = mappedPayment };

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new BaseResponse<PaymentDto> { StatusCode = ResponseEnum.UnSuccessful.EnumFormat().code, Message = ex.Message, ResponseObject = null };

                return BadRequest(response);
            }
        }

        // PUT api/<PaymentsController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<PaymentDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PaymentDto>> PutAsync(int id, [FromBody] Dictionary<string, object> valueInput)
        {
            try
            {
                var paymentDto = valueInput.CustomDeserialize<PaymentDto>();
                var paymentEntity = _mapper.Map<Payment>(paymentDto);
                paymentEntity = await _paymentService.UpdateAsync(id, paymentEntity); 


                var mappedPayment = _mapper.Map<PaymentDto>(paymentEntity);
                BaseResponse<PaymentDto> response = new BaseResponse<PaymentDto> { StatusCode = ResponseEnum.Successful.EnumFormat().code, Message = ResponseEnum.Successful.EnumFormat().desc, ResponseObject = mappedPayment };

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new BaseResponse<PaymentDto> { StatusCode = ResponseEnum.UnSuccessful.EnumFormat().code, Message = ex.Message, ResponseObject = null };

                return BadRequest(response);
            }
        }

        // DELETE api/<PaymentsController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(BaseResponse<bool>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> DeleteAsync(int id)
        {
            try
            {
                Payment payment = await _paymentService.GetAsync(id);
                return Ok(await _paymentService.DeleteAsync(payment));
            }
            catch (Exception ex)
            {
                var response = new BaseResponse<bool> { StatusCode = ResponseEnum.UnSuccessful.EnumFormat().code, Message = ex.Message };
                return BadRequest(response);
            }

        }
    }
}
