import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SalesDataService } from 'src/app/services/sales-data.service';

const LINE_CHART_SAMPLE_DATA: any[] = [
  {
    data: [32, 14, 46, 23, 38, 56],
    label: 'Sentiment Analysis',
    fill: true,
    tension: 0.5,
    borderWidth: 1.5,
    backgroundColor: 'rgba(6, 214, 160, 0.2)',
    borderColor: 'rgba(0, 200, 140, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555',
    pointRadius: 3,
  },
  {
    data: [12, 18, 26, 13, 28, 26],
    label: 'Image Recognition',
    fill: true,
    tension: 0.5,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 209, 102, 0.2',
    borderColor: 'rgba(240, 180, 89, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555',
    pointRadius: 3,
  },
  {
    data: [52, 34, 49, 53, 68, 62],
    label: 'Forecasting',
    fill: true,
    tension: 0.5,
    borderWidth: 1.5,
    backgroundColor: 'rgba(15, 78, 133, 0.2)',
    borderColor: 'rgba(3, 64, 128, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555',
    pointRadius: 3,
  },
];

const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  lineChartData: any[] = LINE_CHART_SAMPLE_DATA;
  lineChartLabels: string[] = LINE_CHART_LABELS;
  lineChartOptions: any = {
    responsive: true,
  };
  lineChartLegend = true;

  topCustomers?: string[];
  allOrders?: any[];

  constructor(private _salesDataService: SalesDataService) {}

  ngOnInit() {
    this._salesDataService.getOrders(1, 100).subscribe((res: any) => {
      this.allOrders = res.page.data;

      this._salesDataService.getOrdersByCustomer(3).subscribe((cus: any) => {
        this.topCustomers = cus.map((x: any) => x.state);

        const allChartData = this.topCustomers?.reduce((result: any, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

        let dates = allChartData.map((x: any) =>
          x.data.reduce((acum: any, itin: any) => {
            acum.push(itin.map((o: any) => new Date(o)));
            return acum;
          }, [])
        );

        dates = [].concat.apply([], dates);

        const customerByDate = this.getCustomerOrdersByDate(
          allChartData,
          dates
        );

        const labels = customerByDate['data'];

        this.lineChartLabels = customerByDate['data'][0]['orders'].map(
          (order: any) => order.date
        );

        const dataLineChart = customerByDate.data.map((obj: any) => {
          const lineData = {
            data: obj.orders.map((ord: any) => ord.total),
            label: obj.customer,
          };
          return lineData;
        });

        console.log(dataLineChart);

      });
    });
  }

  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter(
      (o: any) => o.customer.name === name
    );

    const formattedOrders = customerOrders.reduce((res: any, elem: any) => {
      res.push([elem.placed, elem.total]);
      return res;
    }, []);

    const result = { customer: name, data: formattedOrders };
    return result;
  }

  getCustomerOrdersByDate(orders: any, dates: any) {
    // for each customer -> for each date =>
    // { data: [{'customer': 'XYZ', 'orders': [{ 'date': '23-11-25', total: 2421}, {}]}, {}, {}]}

    const customers = this.topCustomers;
    const prettyDates = dates.map((date: any) => this.toFriendlyDate(date[0]));
    const uniqueDates = Array.from(new Set(prettyDates)).sort();

    // define our result object to return
    const result = { data: [] as any[] };
    let dataSets: { customer: any; orders: any }[] = result.data;

    customers!.reduce((acc: any, customer, index) => {
      const customerOrders: any = [];
      dataSets[index] = {
        customer: customer,
        orders: uniqueDates.reduce((innerAcc: any, date: any) => {
          const obj = { date: '', total: '' };
          obj['date'] = date;
          obj['total'] = this.getCustomerDateTotal(date, customer);
          // sum total orders for this customer on this date
          customerOrders.push(obj);
          return innerAcc;
        }, customerOrders),
      };
      return acc;
    }, []);

    return result;
  }

  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any, customer: string) {
    const ordersByCustomer = this.allOrders?.filter(
      (order: any) =>
        order.customer.name === customer &&
        this.toFriendlyDate(order.placed) === date
    );

    const ordersTotal = ordersByCustomer?.reduce((acc: any, order: any) => {
      return acc + order.total;
    }, 0);

    return ordersTotal;
  }
}
