import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { catchError, map, Observable, of, pipe, Subject, Subscription, tap, throwError } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private readonly uri = 'wss://ws.bitmex.com/realtime';
  webSocketSubject: Subject<any>;

  constructor() {
    this.webSocketSubject = webSocket(this.uri)
  }

  connectSocket(webSocketUrl: string): Observable<any> {
    console.log(webSocketUrl)
    try {
      this.webSocketSubject = webSocket(webSocketUrl)
    }
    catch{
      return of(false)
    }
    return of(true)
  }

  sendMessage(body: Object){
    this.webSocketSubject.next(body)
  }

  recieveMessages(): Observable<any> {
    return this.webSocketSubject
  }

  disconnectSocket() {
    this.webSocketSubject.complete();
  }
}
