namespace Backend.Entity
{
    public class ServiceEntity
    {
        public int Id { get; set; }

        //public string Terms { get; set; } ESSA LINHA NAO TINHA NO SQL, REVISAR DEPOIS

        public string Description { get; set; }
        public string OriginDescription { get; set; }
        public int Status { get; set; }
        public string DestinationDescription { get; set; }
        public DateTime Date { get; set; }
        public string Obs { get; set; }
        public int Address_Id { get; set; }
        public int Address_Id1 { get; set; }
        public int User_Id { get; set; }
        public int User_Id1 { get; set; }

    }
}
