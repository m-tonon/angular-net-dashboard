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

    private void SeedOrders(int n) 
    {
      List<Order> orders = BuildOrderList(n);

      foreach(var order in orders)
      {
        _ctx.Orders.Add(order);
      }
    }

    private List<Customer> BuildCustomerList(int nCustomers)
    {
      var customers = new List<Customer>();
      var names = new List<string>();

      for (var i = 1; i <= nCustomers; i++)
      {
        var name = Helpers.MakeUniqueCustomerName(names);
        names.Add(name);
        

        customers.Add(new Customer {
          Id = i,
          Name = name,
          Email = Helpers.MakeCustomerEmail(name),
          State = Helpers.GetRandomState()
        });
      }

      return customers;
    }

    private List<Order> BuildOrderList(int nOrders)
    {
      var orders = new List<Order>();
      var rand = new Random();

      for (var i = 1; i <= nOrders; i++)
      {
        var randCustomerId = rand.Next(_ctx.Customer.Count());
        var placed = Helpers.GetRandomOrderPlaced();
        var completed = Helpers.GetRandomOrderCompleted(placed);

        orders.Add(new Order{
          Id = i,
          Customer = _ctx.Customer.First(c => c.Id == randCustomerId),
          Total = Helpers.GetRandomOrderTotal(),
          Placed = placed,
          Completed = completed
        });
      }
    }

  }
}
