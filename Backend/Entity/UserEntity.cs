namespace Backend.Entity
{
    public class UserEntity
    {
        public int Id { get; set; }
        public string Document { get; set; }
        public string Telephone1 { get; set; }
        public string? Telephone2 { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public int Type { get; set; }
        public string? CNH { get; set; }
        public string? Photo { get; set; }
        public string? Role { get; set; }
        public string? PasswordRecoveryUUID { get; set; }
        public DateTime? PasswordRecoveryDate { get; set; }
        public string? EmailValidationUUID { get; set; }
        public DateTime? EmailValidationDate { get; set; }
    }
}
