namespace webapi.Models
{
    public class Quote
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int Term { get; set; }
        public decimal SumInsured { get; set; }

        public Dictionary<string, decimal> Premiums { get; set; } = new();
        public DateTime CreatedDate { get; set; }

    }
}
