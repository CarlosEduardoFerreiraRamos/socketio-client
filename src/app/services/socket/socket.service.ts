import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tasks } from '../tasks/models';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private _socket = socketIo(environment.webSocketApi);

  constructor() { }

  public initSocket(): void {
    this._socket = socketIo(environment.webSocketApi);
  }

  public send(message: string): void {
    this._socket.emit('message', message);
  }

  public sendWs(ws: string): void {
    this._socket.emit('ws', ws);
  }

  public sendTask(task: Tasks, value: any): void {
    this._socket.emit('tasks', {task, value});
  }

  public disconnect(): void {
    this._socket.disconnect();
  }

  public onMessage(): Observable<string> {
    return new Observable( observer => this._socket.on('message', data => observer.next(data)));
  }


  public onWs(): Observable<string> {
    return new Observable( observer => this._socket.on('ws', data => observer.next(data)));
  }

  public onEvent(event): Observable<string> {
    return new Observable( observer => this._socket.on(event, () => observer.next()));
  }
}
