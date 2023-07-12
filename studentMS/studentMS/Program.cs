using Microsoft.EntityFrameworkCore;
using studentMS.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
/** USED TO CONNECT TO DB*/
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
/** USED TO CONNECT UI ANGULAR*/
builder.Services.AddCors(options => options.AddPolicy(name: "Student", policy => { policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader(); }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

/** USED TO CONNECT UI ANGULAR*/
app.UseCors("Student");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
