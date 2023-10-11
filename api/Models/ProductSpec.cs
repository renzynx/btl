using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace QLDienMay.Models;

public class ProductSpec
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    public string Screen { get; set; }
    
    public int InternalStorage { get; set; }
    
    public string CPU { get; set; }
    
    public string OS { get; set; }
    
    public string ReleaseDate { get; set; }
    
    public string Origin { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public string? ProductId { get; set; }
}