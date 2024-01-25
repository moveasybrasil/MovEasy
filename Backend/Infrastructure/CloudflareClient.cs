using Amazon.S3.Model;
using Amazon.S3;
using Backend.Contracts.Infrastructure;

namespace Backend.Infrastructure
{
    public class CloudflareClient : ICloudFlareClient
    {

        private readonly string accountId = "9c11b75c97ca7c2f72502ca34ccaaffa";
        private readonly string accessKey = "a5fff7bd31e0380216b595dfe71939bc";
        private readonly string accessSecret = "37d3e36f6166394a3eb7ae260fcdde4bc0052066b44a1ec7ac7cd7e338874c29";

        public async Task UploadImage(Stream image, string imageName, string type)
        {
            var s3Client = new AmazonS3Client(
                accessKey,
                accessSecret,
                new AmazonS3Config
                {
                    ServiceURL = $"https://{accountId}.r2.cloudflarestorage.com"
                });

            var request = new PutObjectRequest
            {
                BucketName = "moveasy",
                Key = imageName,
                InputStream = image,
                ContentType = type,
                DisablePayloadSigning = true
            };

            var response = await s3Client.PutObjectAsync(request);

            if (response.HttpStatusCode != System.Net.HttpStatusCode.OK && response.HttpStatusCode != System.Net.HttpStatusCode.Accepted)
            {
                throw new Exception("Upload to Cloudflare R2 failed");
            }
        }

    }
}
