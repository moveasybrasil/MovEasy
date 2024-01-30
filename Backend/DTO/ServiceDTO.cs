namespace Backend.DTO
{
    public class ServiceDTO
    {
        public string Terms { get; set; }
        public string Description { get; set; }
        public string OriginDescription { get; set; }
        public string DestinationDescription { get; set; }
        public DateTime Date { get; set; }
        public string Obs { get; set; }
        public AddressDTO Address_Id { get; set; } 
        public AddressDTO Address_Id1 { get; set; }
    }
}
