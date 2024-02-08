namespace Backend.Entity
{
    public class VehicleEntity
    {
        public int Id { get; set; }
        public string LicensePlate { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public int? Capacity { get; set; }
        public string Colour { get; set; }

    }
}
