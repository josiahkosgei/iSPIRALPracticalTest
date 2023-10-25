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
    }
}