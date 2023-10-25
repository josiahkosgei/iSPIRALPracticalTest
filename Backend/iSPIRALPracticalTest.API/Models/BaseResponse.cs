using System.ComponentModel;

namespace iSPIRALPracticalTest.API.Models
{
    public class BaseResponse
    {
        public string StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public string Message { get; set; }
    }
    public class BaseResponse<T> : BaseResponse
    {
        public T ResponseObject { get; set; }

    }


}
