using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
  private readonly AppDbContext _ctx;

  public OrderController(AppDbContext ctx)
  {
    _ctx = ctx;
  }

  // GET api/order/pageNumber(which page)/pageSize(x results per page)
  [HttpGet("{pageIndex:int}/{pageSize:int}")]
  public IActionResult Get(int pageIndex, int pageSize)
  {
    var data = _ctx.Orders.Include(o => o.Customer)
      .OrderByDescending(c => c.Placed);

    var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);

    var totalCount = data.Count();
    var totalPages = Math.Ceiling((double)totalCount / pageSize);

    var response = new
    {
      Page = page,
      TotalPages = totalPages
    };

    return Ok();
  }
}