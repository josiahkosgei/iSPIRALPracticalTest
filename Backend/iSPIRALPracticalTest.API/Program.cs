using iSPIRALPracticalTest.API.Extensions;
using iSPIRALPracticalTest.Data;
using iSPIRALPracticalTest.Data.IRepository;
using iSPIRALPracticalTest.Data.Repository;
using iSPIRALPracticalTest.Data.SeedData;
using iSPIRALPracticalTest.Data.Services;
using iSPIRALPracticalTest.Data.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure application settings
var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string connectionString = builder.Configuration.GetConnectionString("ApiConnectionString");
builder.Services.AddDbContext<PracticalTestDbContext>(opt =>
{
    opt.UseSqlServer(connectionString, builder =>
    {
        builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
    });
},
    contextLifetime: ServiceLifetime.Scoped,
    optionsLifetime: ServiceLifetime.Scoped
);

// Define a CORs policy for our angular frontend connection
builder.Services.AddCors(options =>
{
    options.AddPolicy(
      "CorsPolicy",
       builder => builder.WithOrigins("http://localhost:4200")
      .AllowAnyMethod()
      .AllowAnyHeader()
      .AllowCredentials());
});

// Inject Our services to the container
builder.Services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

var app = builder.Build();

app.UseRouting();
app.UseAuthorization();

app.MapControllers();
app.UseCors("CorsPolicy");

//Migrate Database and Seed Initial Data
app.MigrateDatabase<PracticalTestDbContext>((context, services) =>
{
    var logger = services.GetService<ILogger<PracticalTestDbContextSeed>>();
    PracticalTestDbContextSeed.SeedAsync(context, logger).Wait();
}).Run();
