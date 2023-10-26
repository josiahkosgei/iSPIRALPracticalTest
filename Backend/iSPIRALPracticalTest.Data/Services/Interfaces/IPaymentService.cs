using iSPIRALPracticalTest.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iSPIRALPracticalTest.Data.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<IList<Payment>> GetAllAsync();
        Task<Payment> GetAsync(int id);
        Task<Payment> AddAsync(Payment entity);
        Task<Payment> UpdateAsync(int id, Payment entity);
        Task<bool> DeleteAsync(Payment entity);
    }
}
