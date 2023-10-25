namespace iSPIRALPracticalTest.Data.IRepository
{
    public interface IRepository<T> where T: class
    {
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<T> GetAsync(int id);
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}
