import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Server } from 'src/app/models/server.model';

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  @Input() server!: Server;
  color?: string;
  buttonText?: string;

  constructor() {}

  ngOnInit(): void {
    this.setServerStatus(this.server.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.server.isOnline = true;
      this.color = '#66BB6A';
      this.buttonText = 'Shut Down';
    } else {
      this.server.isOnline = false;
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  toogleStatus(onlineStatus: boolean) {
    this.setServerStatus(!onlineStatus);
  };

}
