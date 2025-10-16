using System.Collections.Concurrent;
using webapi.Models;

namespace webapi.Data
{
    public class QuoteRepository
    {
        private readonly ConcurrentDictionary<Guid, Quote> _quotes = new();

        public Quote Add(Quote quote)
        {
            _quotes[quote.Id] = quote;
            return quote;
        }

        public Quote? Get(Guid id)
        {
            _quotes.TryGetValue(id, out var quote);
            return quote;
        }
        public Quote? FindByDetails(int term, decimal sumInsured)
        {
            return _quotes.Values.FirstOrDefault(q => q.Term == term && q.SumInsured == sumInsured);
        }
    }
}
