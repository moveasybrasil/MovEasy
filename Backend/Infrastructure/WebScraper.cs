using Backend.DTO;
using HtmlAgilityPack;
using MySqlX.XDevAPI;

namespace Backend.Infrastructure
{
    public class WebScraper
    {
        public static async Task<VehicleDTO> GetVehicleDataFromLicensePlate(string licensePlate)
        {
            try
            {
                licensePlate = licensePlate.ToUpper();
                var url = $"https://placafipe.com/placa/{licensePlate}";
                var httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
                var html = await httpClient.GetStringAsync(url);

                var htmlDocument = new HtmlDocument();
                htmlDocument.LoadHtml(html);

                var table = htmlDocument.DocumentNode.SelectSingleNode("//table[@class='fipeTablePriceDetail']");

                string? name = "", year = "", colour = "";
                int i = 1;
                while(table.SelectSingleNode($".//tr[{i}]") != null)
                {
                    HtmlNode TR = table.SelectSingleNode($".//tr[{i}]");
                    HtmlNode TDName = TR.SelectSingleNode(".//td[1]").SelectSingleNode(".//b[1]");

                    switch (TDName.InnerHtml) 
                    {
                        case "Modelo:":
                            name = TR.SelectSingleNode(".//td[2]").InnerText;
                            break;
                        case "Genérico:":
                            if (name == "")
                            {
                                name = TR.SelectSingleNode(".//td[2]").InnerText;
                            }
                            break;
                        case "Ano Modelo:":
                            year = TR.SelectSingleNode(".//td[2]").InnerText;
                            break;
                        case "Ano:":
                            if (year == "")
                            {
                                year = TR.SelectSingleNode(".//td[2]").InnerText;
                            }
                            break;
                        case "Cor:":
                            colour = TR.SelectSingleNode(".//td[2]").InnerText;
                            break;
                    }

                    i++;
                }

                return new VehicleDTO() { 
                    LicensePlate = licensePlate,
                    Name = name,
                    Year = year,
                    Colour = colour
                };
            } catch (Exception ex)
            {
                throw new Exception($"Erro ao carregar site. {ex.Message}");
            }

        }
    }
}
