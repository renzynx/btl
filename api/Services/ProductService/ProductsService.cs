using Microsoft.Extensions.Options;
using MongoDB.Driver;
using QLDienMay.Models;

namespace QLDienMay.Services.ProductService;

public class ProductsService : IProductService
{
    private readonly IMongoCollection<Product> _productsCollection;

    private readonly IMongoCollection<ProductSpec> _specsCollection;

    public ProductsService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

        _productsCollection =
            mongoDatabase.GetCollection<Product>(databaseSettings.Value.ProductsCollectionName);

        _specsCollection =
            mongoDatabase.GetCollection<ProductSpec>(databaseSettings.Value.SpecsCollectionName);
    }

    public async Task<List<Product>> GetAsync() => await _productsCollection.Find(_ => true).ToListAsync();

    public async Task<Product?> GetAsync(string id) =>
        await _productsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Product newProduct) => await _productsCollection.InsertOneAsync(newProduct);

    public async Task UpdateAsync(string id, Product updatedProduct) =>
        await _productsCollection.ReplaceOneAsync(x => x.Id == id, updatedProduct);

    public async Task RemoveAsync(string id) => await _productsCollection.DeleteOneAsync(x => x.Id == id);

    public async Task UpdateSpec(ProductSpec updatedSpec)
    {
        var spec = await _specsCollection.Find(x => x.ProductId == updatedSpec.ProductId).FirstOrDefaultAsync();

        if (spec is null)
        {
            await _specsCollection.InsertOneAsync(updatedSpec);
            return;
        }
        else
        {
            await _specsCollection.ReplaceOneAsync(x => x.ProductId == updatedSpec.ProductId, updatedSpec);
            return;
        }
    } 
}