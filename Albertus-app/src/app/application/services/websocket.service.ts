import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocketSubject<unknown>;
  
  constructor() { 
    this.ping();
  }

  conect(){
    return this.socket = webSocket(`${environment.urlWebSocket}/retrieve/1`)
  }

  close(){
    this.socket.unsubscribe();    
  }

  ping(){
    setInterval(() => this.socket.next("ping"), 30000);
  }
}
