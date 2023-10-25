using iSPIRALPracticalTest.Data;
using iSPIRALPracticalTest.Data.IRepository;
using iSPIRALPracticalTest.Data.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var CorsPolicy = "CorsPolicy";
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
    opt.EnableSensitiveDataLogging();
},
    contextLifetime: ServiceLifetime.Scoped,
    optionsLifetime: ServiceLifetime.Scoped
);

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

builder.Services.AddCors(options =>
{
    options.AddPolicy(
      CorsPolicy,
       builder => builder.WithOrigins("http://localhost:4200")
      .AllowAnyMethod()
      .AllowAnyHeader()
      .AllowCredentials());
});
var app = builder.Build();

// Setup database migrations
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<PracticalTestDbContext>>();
    try
    {
        AppBuilderExtension.SetupMigrations(services);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, ex.Message);
    }
}
//app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();
app.UseCors(CorsPolicy);

app.Run();
