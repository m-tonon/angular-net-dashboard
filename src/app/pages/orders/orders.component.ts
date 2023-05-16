import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  
  constructor() {}

  orders: Order[] = [
    {
      id: 1,
      customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'},
      total: 230, placed: new Date(2022, 12, 1),fulfilled: new Date(2022, 12, 2)
    },
    {
      id: 2,
      customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'},
      total: 230, placed: new Date(2022, 12, 1),fulfilled: new Date(2022, 12, 2)
    },
    {
      id: 3,
      customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'},
      total: 230, placed: new Date(2022, 12, 1),fulfilled: new Date(2022, 12, 2)
    },
    {
      id: 4,
      customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'},
      total: 230, placed: new Date(2022, 12, 1),fulfilled: new Date(2022, 12, 2)
    },
    {
      id: 5,
      customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'},
      total: 230, placed: new Date(2022, 12, 1),fulfilled: new Date(2022, 12, 2)
    }
  ];

  ngOnInit(): void {}
  
}
