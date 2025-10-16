using webapi.Data;
using webapi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev",
        policy => policy
            .WithOrigins("https://localhost:5173") // React dev server
            .AllowAnyHeader()
            .AllowAnyMethod());
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Dependencies
builder.Services.AddSingleton<QuoteRepository>();
builder.Services.AddSingleton<QuoteService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactDev"); // enable CORS


app.UseAuthorization();

app.MapControllers();

app.Run();
