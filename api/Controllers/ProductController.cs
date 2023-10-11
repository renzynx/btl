using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QLDienMay.Models;
using QLDienMay.Services.ProductService;

namespace QLDienMay.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ProductController : Controller
{
    private readonly ProductsService _productsService;
    
    public ProductController(ProductsService productsService) => _productsService = productsService;
      
    

    [AllowAnonymous]
    [HttpGet]
    public async Task<List<Product>> Get() => await _productsService.GetAsync();

    [AllowAnonymous]
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Product>> Get(string id)
    {
        var product = await _productsService.GetAsync(id);

        if (product is null)
            return NotFound();

        return product;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Product newProduct)
    {
        var token = Request.Headers["Authorization"].ToString().Split(" ")?.LastOrDefault();
        
        var t = new JwtSecurityToken(token);

        string role = t.Claims.First(c => c.Type == "role").Value;

        if (role == "0")
            return Unauthorized();
        
        await _productsService.CreateAsync(newProduct);

        return CreatedAtAction(nameof(Get), new { id = newProduct.Id }, newProduct);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Product updatedProduct)
    {
        var token = Request.Headers["Authorization"].ToString().Split(" ")?.LastOrDefault();
        
        var t = new JwtSecurityToken(token);

        string role = t.Claims.First(c => c.Type == "role").Value;

        if (role == "0")
            return Unauthorized();
        
        var product = await _productsService.GetAsync(id);

        if (product is null)
        {
            return NotFound();
        }

        updatedProduct.Id = product.Id;

        await _productsService.UpdateAsync(id, updatedProduct);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var token = Request.Headers["Authorization"].ToString().Split(" ")?.LastOrDefault();

     
        var t = new JwtSecurityToken(token);

        string role = t.Claims.First(c => c.Type == "role").Value;

        if (role == "0")
            return Unauthorized();
        
        var product = await _productsService.GetAsync(id);

        if (product is null)
            return NotFound();

        await _productsService.RemoveAsync(id);

        return NoContent();
    }
    
    [HttpPost("spec")]
    public async Task<IActionResult> UpdateSpec(ProductSpec updatedSpec)
    {
        var token = Request.Headers["Authorization"].ToString().Split(" ")?.LastOrDefault();
        
        var t = new JwtSecurityToken(token);

        string role = t.Claims.First(c => c.Type == "role").Value;

        if (role == "0")
            return Unauthorized();
        
        if (updatedSpec.ProductId is null)
            return BadRequest();
        
        var product = await _productsService.GetAsync(updatedSpec.ProductId);

        if (product is null)
            return NotFound();

        await _productsService.UpdateSpec(updatedSpec);

        return NoContent();
    }
}