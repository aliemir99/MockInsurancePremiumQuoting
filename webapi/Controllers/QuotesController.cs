using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

namespace MockInsurance.Quoter.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly QuoteService _quoteService;
        private readonly ILogger<QuotesController> _logger;

        public QuotesController(QuoteService quoteService, ILogger<QuotesController> logger)
        {
            _quoteService = quoteService;
            _logger = logger;
        }

        /// <summary>
        /// Submit a new quote request.
        /// </summary>
        [HttpPost]
        public ActionResult SubmitQuote([FromBody] QuoteRequest request)
        {
            if (request.Term <= 0 || request.SumInsured <= 0)
                return BadRequest("Both term and sumInsured must be positive values.");

            var quote = _quoteService.CreateQuote(request.Term, request.SumInsured);
            _logger.LogInformation("Quote created: {QuoteId}", quote.Id);

            return Ok(new { quoteId = quote.Id });
        }

        /// <summary>
        /// Retrieve an existing quote by ID.
        /// </summary>
        [HttpGet("{id:guid}")]
        public ActionResult<Quote> GetQuote(Guid id)
        {
            var quote = _quoteService.GetQuote(id);
            if (quote == null)
                return NotFound("Quote not found.");

            return Ok(quote);
        }
    }
}
