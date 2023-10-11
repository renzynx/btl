using QLDienMay.Models;

namespace QLDienMay.Dtos;

public class AuthenticateResponse
{
    public string? Id { get; set; }
    public string Email { get; set; }
    public int Role { get; set; }
    public string Token { get; set; }

    public AuthenticateResponse(User user, string token)
    {
        Id = user.Id;
        Email = user.Email;
        Role = user.Role;
        Token = token;
    }
}