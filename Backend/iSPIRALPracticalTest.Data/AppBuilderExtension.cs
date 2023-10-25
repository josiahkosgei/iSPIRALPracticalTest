using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace iSPIRALPracticalTest.Data
{
    public static class AppBuilderExtension
    {
        public static void SetupMigrations(IServiceProvider service)
        {
            var logger = service.GetService<ILogger<PracticalTestDbContext>>();
            try
            {
                var context = service.GetService<PracticalTestDbContext>();
                context.Database.Migrate();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
            }

        }
    }
}

