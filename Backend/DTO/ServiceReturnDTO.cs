namespace Backend.DTO
{
    public class ServiceReturnDTO
    {
        public int Id { get; set; }
        public string Terms { get; set; }
        public string Description { get; set; }
        public string OriginDescription { get; set; }
        public int Status { get; set; }
        public string DestinationDescription { get; set; }
        public DateTime Date { get; set; }
        public string Obs { get; set; }
        public AddressDTO Address { get; set; }
        public AddressDTO Address1 { get; set; }
        public int User_Id { get; set; }
        public int User_Id1 { get; set; }
        public float Price { get; set; }
    }
}
