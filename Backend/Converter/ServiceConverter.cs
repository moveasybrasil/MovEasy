using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using Backend.Repository;

namespace Backend.Converter
{
    public class ServiceConverter
    {
        public async static Task<ServiceEntity> Convert(ServiceDTO service, int AddressId, int AddressId1, int userId, int price)
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
                Address_Id = AddressId,
                Address_Id1 = AddressId1,
                User_Id = userId,
                User_Id1 = 0,
                Price = price
            };
            return ServiceEntity;
        }
    }
}
