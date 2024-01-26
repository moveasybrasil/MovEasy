namespace Backend.Contracts.Infrastructure
{
    public interface ICloudFlareClient
    {

        Task UploadImage(Stream image, string imageName, string type);

    }
}