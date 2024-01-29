using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using Backend.Repository;

namespace Backend.Converter
{
    public class ServiceConverter
    {
        public async static Task<ServiceEntity> Convert(ServiceDTO service, int userId)
        {

            ServiceEntity ServiceEntity = new ServiceEntity()
            {
                Terms = service.Terms,
                Description = service.Description,
                OriginDescription = service.OriginDescription,
                Status = 0,
                DestinationDescription = service.DestinationDescription,
                Date = service.Date,
                Obs = service.Obs,
                Address_Id = await GetAddressEntityFromDTO(service.Address_Id),
                Address_Id1 = await GetAddressEntityFromDTO(service.Address_Id1),
                User_Id = userId,
                User_Id1 = 0
            };
            return ServiceEntity;
        }

        private async static Task<int> GetAddressEntityFromDTO(AddressDTO AddressDTO)
        {
            //using(HttpClient Client = new(){BaseAddress = new Uri(Configuration.ServerURL)})
            //{
            //    await Client.PostAsync($"/address");
            //}
            var addressRepository = new AddressRepository();
            
            return await addressRepository.Add(AddressDTO);
        }
    }
}
