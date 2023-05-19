// using System.Linq;
// using System.Collections.Generic;
using WebApi.Data;

namespace WebApi
{
  public class DataSeed
  {
    private readonly AppDbContext _ctx;

    public DataSeed(AppDbContext ctx)
    {
      _ctx = ctx;
    }

    public void SeedData(int nCustomers, int nOrders)
    {
      if (!_ctx.Customer.Any())
      {
        SeedCustomers(nCustomers);
      }

      if (!_ctx.Orders.Any())
      {
        SeedOrders(nCustomers);
      }

      if (!_ctx.Servers.Any())
      {
        SeedServers(nCustomers);
      }
        _ctx.SaveChanges();
    }

    private void SeedCustomers(int n)
    {
      List<Customer> customers = BuildCustomerList(n);

      foreach(var customer in customers)
      {
        _ctx.Customer.Add(customer);
      }
    }

    private List<Customer> BuildCustomerList(int nCustomers)
    {
      var customers = new List<Customer>();

      for (var i = 1; i <= nCustomers; i++)
      {
        var name = Helpers.MakeCustomerName();
        

        customers.Add(new Customer {
          Id = i,
          Name = name,
          Email = email,
          State = state
        });
      }
    }

  }
}
