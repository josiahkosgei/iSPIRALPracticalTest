using iSPIRALPracticalTest.Data.Entities;
using iSPIRALPracticalTest.Data.IRepository;
using iSPIRALPracticalTest.Data.Services.Interfaces;
using System.Security.Principal;

namespace iSPIRALPracticalTest.Data.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IRepository<Payment> _paymentRepository;
        public PaymentService(IRepository<Payment> paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }
        public async Task<Payment> AddAsync(Payment entity)
        {
            return await _paymentRepository.AddAsync(entity);
        }

        public async Task<bool> DeleteAsync(Payment entity)
        {
            return await _paymentRepository.DeleteAsync(entity);
        }

        public async Task<IList<Payment>> GetAllAsync()
        {
            return await _paymentRepository.GetAllAsync();
        }

        public async Task<Payment> GetAsync(int id)
        {
            return await _paymentRepository.GetAsync(id);
        }

        public async Task<Payment> UpdateAsync(int id, Payment entity)
        {
            entity.Id = id;
            return await _paymentRepository.UpdateAsync(id, entity);
        }
    }
}
