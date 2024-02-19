using Backend.Contracts.Repository;
using Backend.Entity;
using Backend.Infrastructure;

namespace Backend.Repository
{


    public class VehicleInfoRepository : Connection, IVehicleInfoRepository
    {

        private string ExtractVehicleInfo(String textHtml){
            var startIndex = textHtml.IndexOf("Marca");
            var subString = textHtml.Substring(startIndex);
            var endIndex = subString.IndexOf("</table>");
            var infosString = subString.Substring(0, endIndex);
            return infosString;
        } 

        private string ExtractInfoPart(String info){
            var endIndex = info.IndexOf("</td></tr><tr>");
            return info.Substring(0, endIndex);
        }

        public async Task<VehicleEntity> GetInfoFromPlate(string plate)
        {
            var baseURL = $"https://placafipe.com/placa/{plate}";

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

                string htmlContent = await client.GetStringAsync(baseURL);

                var infoInParts = ExtractVehicleInfo(htmlContent).Split("<td>");

                var Nome = ExtractInfoPart(infoInParts[3]);
                var Modelo = ExtractInfoPart(infoInParts[5]);
                var Ano = int.Parse(ExtractInfoPart(infoInParts[9]));
                var Cor = ExtractInfoPart(infoInParts[13]);

                return new VehicleEntity
                {
                    Name = Nome,
                    Capacity = 5,
                    Year = Ano,
                    Colour = Cor,
                    LicensePlate = plate,
                    Id = 0
                };
            }

        }

        public Task<VehicleEntity> Register(VehicleEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}