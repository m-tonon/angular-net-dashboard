import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Server } from 'src/app/models/server.model';

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  @Input() server!: Server;

  constructor() {}

}
