using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
    

namespace QLDienMay.Models;

public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")] 
    public string ProductName { get; set; } = null!;
   
    public double Price { get; set; }
    
    public string Category { get; set; }
    
    public string Description { get; set; }
    
    public string Image { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public string? SpecId { get; set; }
    
    [BsonIgnore]
    public ProductSpec? Spec { get; set; }
}