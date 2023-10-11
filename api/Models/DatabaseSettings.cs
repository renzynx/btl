namespace QLDienMay.Models;

public class DatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string ProductsCollectionName { get; set; } = null!;

    public string SpecsCollectionName { get; set; } = null!;

    public string UsersCollectionName { get; set; } = null!;

    public string JwtKey { get; set; } = null!;
}