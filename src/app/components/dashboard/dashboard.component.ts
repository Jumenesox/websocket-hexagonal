import { Component, Inject, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import IDisplayHeroes from 'src/app/domain/ports/i-display-heroes';
import IWebSocket from 'src/app/domain/ports/IWebsocket';
import { webSocket } from 'rxjs/webSocket';
import {
  catchError,
  map,
  Observable,
  Observer,
  of,
  pipe,
  Subject,
  take,
} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private readonly URL = 'wss://ws.bitmex.com/realtime';
  teste: any;
  observable$!: Observable<any>;
  dataList: Array<any> = [];

  constructor(
    @Inject('IDisplayHeroes') public heroesDisplayer: IDisplayHeroes,
    @Inject('IWebSocket') public webSocketService: IWebSocket // @Inject('IWebSocket') public webSocketT: IWebSocket
  ) {}

  ngOnInit(): void {
    this.heroesDisplayer.askHeroesList().subscribe();

    let webSocketConnection$ = this.webSocketService.connectSocket(this.URL);
    webSocketConnection$.subscribe((status) =>
      status ? this.messageListener() : 'erro na conexão'
    );

    // observable$.subscribe(_ => this.messageListener())
    //  this.webSocketSubject.forEach(_ => console.log(_));

    // this.webSocketSubject.next({"op": "subscribe", "args": "trade"});
  }

  sendMessage() {
    console.log('send message');
    this.webSocketService.sendMessage({ op: 'subscribe', args: 'trade' });
  }

  messageListener() {
    this.sendMessage();
    this.webSocketService
      .recieveMessages()
      .pipe(map((_: any) => this.setData(_)))
      .subscribe();
  }
  setData(data: any) {
    if (this.dataList.length < 10) this.dataList.push(data);
    else this.webSocketService.disconnectSocket();
    console.log(this.dataList);
  }
}
