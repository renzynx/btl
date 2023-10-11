using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using Isopoh.Cryptography.Argon2;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using QLDienMay.Dtos;
using QLDienMay.Models;

namespace QLDienMay.Services.ProductService;

public class UserService
{
    private readonly IMongoCollection<User> _usersCollection;

    private readonly IConfiguration _configuration;

    public UserService(IOptions<DatabaseSettings> databaseSettings, IConfiguration configuration)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        
        var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

        _usersCollection = mongoDatabase.GetCollection<User>(databaseSettings.Value.UsersCollectionName);

        _configuration = configuration;
    }

    public async Task<User?> GetUser(string id) 
    {
        var user = await _usersCollection.Find(user => user.Id == id).FirstOrDefaultAsync();

        if (user is null)
        {
            return null;
        }
        
        user.Password = null!;

        return user;
    }
    
    public async Task CreateUser(User user)
    {
        var hashedPassword = Argon2.Hash(user.Password);

        User newUser = new User
        {
            Id = user.Id,
            Email = user.Email,
            Password = hashedPassword
        };

        await _usersCollection.InsertOneAsync(newUser);
    }

    public async Task<User?> FindUserByEmail(string email) => await _usersCollection.Find(x => x.Email == email).FirstOrDefaultAsync();

    public async Task<AuthenticateResponse?> Authenticate(string email, string password)
    {
        try
        {
            var user = await FindUserByEmail(email);

            if (user is null)
                return null;

            if (!Argon2.Verify(user.Password, password))
                return null;


            var token = GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }
        catch (Exception ex)
        {
            Console.Write(ex.Message);
        }

        return null;
    }

    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("JwtKey")!);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, user.Email), new Claim(ClaimTypes.Role, user.Role.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public bool ValidateJwtToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var validationParameters = GetValidationParameters();

        SecurityToken validatedToken;
        IPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
        return true;
    }
    
    private TokenValidationParameters GetValidationParameters()
    {
        return new TokenValidationParameters()
        {
            ValidateLifetime = false, 
            ValidateAudience = false,
            ValidateIssuer = false,  
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JwtKey")!))
        };
    }
}