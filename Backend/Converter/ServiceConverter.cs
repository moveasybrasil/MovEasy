using Backend.DTO;
using Backend.Entity;

namespace Backend.Converter
{
    public class ServiceConverter
    {
        public async static Task<ServiceEntity> Convert(ServiceDTO service)
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
                Address_Id = 1,
                Address_Id1 = 2,
                User_Id = 1,
                User_Id1 = 2
            };
            return ServiceEntity;
        }
    }
}
