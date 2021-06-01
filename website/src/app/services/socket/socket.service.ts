import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ServerMessage } from './messages/server/ServerMessage';
import { SocketMessagesListeners } from './types/SocketMessagesListeners';
import { handleSocketMessage } from './utils/handleSocketMessage';
import { initializeSocketListeners } from './utils/initializeSocketListeners';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private subject = new Subject<ServerMessage>();
  private server: WebSocket;
  public on: SocketMessagesListeners = initializeSocketListeners();
  
  constructor() { }

  public disconnect() {
    this.server && this.server.close();
  }

  public connect(url: string,token:string) {
      this.server = new WebSocket(`${url}/authorization?token=${token}`);
      this.server.onmessage = (ev: MessageEvent) => {
        handleSocketMessage(JSON.parse(ev.data), this.on);
        this.subject.next(ev.data);
      }
      this.server.onopen = (ev) => {
        console.log(`App socket open at ${url}`);
      };
      this.server.onerror = () => {
        console.error("Socket encountered error: Closing socket");
        this.server.close();
      };
      this.server.onclose = (ev: CloseEvent) => {
        console.log(
          "Socket is closed. Reconnect will be attempted in 2 seconds.",
          ev.reason
        );
        this.reconnect(url,token);
      };
    return this.subject;
  }

  private reconnect = (url:string,token:string) => {
     setTimeout(() => {
        if (
          !(this.server.readyState === this.server.OPEN) &&
          !(this.server.readyState === this.server.CONNECTING)
        ) {
            this.connect(url,token);
        }
      }, 2000);
  }
}
