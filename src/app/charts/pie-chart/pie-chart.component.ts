import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit{
  
  constructor() { }

  pieChartData = [{ data: [350, 450, 120]}];
  pieChartLabels: string[] = ['XYZ Logistics', 'Main St Bakery', 'Acme Hosting'];
  
  ngOnInit(): void {
  }

}
