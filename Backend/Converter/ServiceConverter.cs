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

        public async static Task<ServiceReturnDTO> Deconvert(ServiceEntity service, AddressDTO address, AddressDTO address1)
        {
            ServiceReturnDTO ServiceReturnDTO = new ServiceReturnDTO()
            {
                Id = service.Id,
                Terms = service.Terms,
                Description = service.Description,
                OriginDescription = service.OriginDescription,
                Status = service.Status,
                DestinationDescription = service.DestinationDescription,
                Date = service.Date,
                Obs = service.Obs,
                Address = address,
                Address1 = address1,
                User_Id = service.User_Id,
                User_Id1 = service.User_Id1,
                Price = service.Price / 100
            };
            return ServiceReturnDTO;
        }
    }
}
