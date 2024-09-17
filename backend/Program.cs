using Amazon.Extensions.NETCore.Setup;
using Amazon.SimpleSystemsManagement;
using Amazon.SimpleSystemsManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Load AWS Options from appsettings or environment
builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());

// Add services to the container
builder.Services.AddControllers();

// Fetch Database Credentials from AWS Parameter Store
var ssmClient = new AmazonSimpleSystemsManagementClient();
var dbHost = await GetParameterValueAsync(ssmClient, "/necypaa/ConnectionStrings/DefaultConnection/Host");
var dbUser = await GetParameterValueAsync(ssmClient, "/necypaa/ConnectionStrings/DefaultConnection/Username");
var dbPassword = await GetParameterValueAsync(ssmClient, "/necypaa/ConnectionStrings/DefaultConnection/Password");
var dbName = await GetParameterValueAsync(ssmClient, "/necypaa/ConnectionStrings/DefaultConnection/Database");

// Configure PostgreSQL as the database provider using parameters from Parameter Store
var connectionString = $"Host={dbHost};Username={dbUser};Password={dbPassword};Database={dbName}";
builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(connectionString)
);

// Add Swagger for API documentation (optional)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();

// Helper method to get the parameter value from Parameter Store
async Task<string> GetParameterValueAsync(IAmazonSimpleSystemsManagement ssmClient, string parameterName)
{
    var request = new GetParameterRequest
    {
        Name = parameterName,
        WithDecryption = true // Set this to true to retrieve encrypted values like the password
    };

    var response = await ssmClient.GetParameterAsync(request);
    return response.Parameter.Value;
}