using iSPIRALPracticalTest.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace iSPIRALPracticalTest.Data
{

    public class PracticalTestDbContext : DbContext
    {
        public virtual DbSet<Payment> Payments { get; set; }
        public PracticalTestDbContext(DbContextOptions<PracticalTestDbContext> options) : base(options)
        {

        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<Payment>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = DateTime.Now;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}