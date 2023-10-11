using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QLDienMay.Dtos;
using QLDienMay.Models;
using QLDienMay.Services.ProductService;

namespace QLDienMay.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
   private readonly UserService _userService;

   public UserController(UserService userService) => _userService = userService;
   
   [Authorize]
   [HttpGet("{id:length(24)}")]
   public async Task<ActionResult<User>> GetUser(string id)
   {
       var user = await _userService.GetUser(id);

       if (user is null)
       {
           return NotFound();
       }

       return user;
   }

   [Route("register")]
   [HttpPost]
   public async Task<ActionResult> Register(User user)
   {
       var checkUser = await _userService.FindUserByEmail(user.Email);

       if (checkUser is not null)
           return BadRequest();
       
       await _userService.CreateUser(user);
       
        var res = await _userService.Authenticate(user.Email, user.Password);
       
        return Ok(res);
   }

   [Route("login")]
   [HttpPost]
   public async Task<ActionResult> Login(LoginDto user)
   {
       var res = await _userService.Authenticate(user.Email, user.Password);

       if (res is null)
           return Unauthorized();
       
       return Ok(res);
   }

   [Authorize]
   [Route("self")]
   [HttpGet]
   public async Task<ActionResult<User>> GetMe()
   {
       var token = Request.Headers["Authorization"].ToString().Split(" ")?.LastOrDefault();
       
       var t = new JwtSecurityToken(token);
       
       string email = t.Claims.First(c => c.Type == "email").Value;

       var user = await _userService.FindUserByEmail(email);

       if (user is null)
           return Unauthorized();

       user.Password = null!;

       return user;
   }
}