import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";

export default interface IWebSocket{

   connectSocket(url: string): Observable<any>
   recieveMessages(): Observable<any>
   sendMessage(body: Object): void
   disconnectSocket(): void
}