using iSPIRALPracticalTest.API.Models;
using iSPIRALPracticalTest.Data.Entities;
using AutoMapper;

namespace iSPIRALPracticalTest.API.Helpers
{
    /// <summary>
    /// Defines AutoMapper Profiles
    /// </summary>
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Payment, PaymentDto>().ReverseMap();
            CreateMap<Payment, CreatePaymentDto>().ReverseMap();
        }
    }
}
