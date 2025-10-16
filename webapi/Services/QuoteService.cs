using webapi.Data;
using webapi.Models;

namespace webapi.Services
{
    public class QuoteService
    {
        private readonly QuoteRepository _repository;
        private readonly Random _random = new();

        public QuoteService(QuoteRepository repository)
        {
            _repository = repository;
        }
        public Quote CreateQuote(int term, decimal sumInsured)
        {
            var existingQuote = _repository.FindByDetails(term, sumInsured);
            if (existingQuote != null)
            {
                return existingQuote; // Reuse existing quote
            }
            // Create mock premiums for 4 different companies
            var companies = new[] { "COMP_A", "COMP_B", "COMP_C", "COMP_D" };
            var premiums = companies.ToDictionary(
                c => c,
                c => GeneratePremium(sumInsured, term)
            );

            var quote = new Quote
            {
                Term = term,
                SumInsured = sumInsured,
                Premiums = premiums,
                CreatedDate = DateTime.UtcNow,
            };

            _repository.Add(quote);
            return quote;
        }

        public Quote? GetQuote(Guid id)
        {
            return _repository.Get(id);
        }

        private decimal GeneratePremium(decimal sumInsured, int term)
        {
            // Simple random factor: between 0.5% and 2% of sum insured per year of term
            var rate = (decimal)(_random.NextDouble() * (0.02 - 0.005) + 0.005);
            var premium = sumInsured * rate * (term / 12m);
            return Math.Round(premium, 2);
        }
    }
}

