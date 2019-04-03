import { Component } from '@angular/core';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  messages = [];

  ioConnection: any;
  
  constructor(private _service: SocketService) {

  }

  private initIoConnection(): void {
    this._service.initSocket();

    // this.ioConnection = this._service.onMessage()
    //   .subscribe((message) => {
    //     this.messages.push(message);
    //   });

      this.ioConnection = this._service.onWs()
      .subscribe((message) => {
        this.messages.push('ws', message);
      });      

    this._service.onEvent('connect')
      .subscribe(() => {
        this._service.send('I\'m connected!');
        console.log('connected');
      });
      
    this._service.onEvent('disconnect')
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  onInitConnection() {
    if (this.ioConnection) {
      return;
    }
    this.initIoConnection();
  }

  onMessage(message: string) {
    // this._service.send(message);
    this._service.sendWs(message);
  }

  onDisconnect() {
    this._service.disconnect();
  }
}
