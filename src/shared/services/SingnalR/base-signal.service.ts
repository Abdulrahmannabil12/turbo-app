 import { EventEmitter, Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
 import { environment } from "src/environments/environment.prod";
import { HubConnectionEnum } from "src/shared/enums/hub-connection.enum";
import { LocationMessage } from "src/shared/model/signalR/location-message.model";
import { SessionService } from "../LocalStorage/session.service";

@Injectable({
  providedIn: "root",
})
export class BaseSignalService {
  messageReceived = new EventEmitter<LocationMessage>();
  connectionEstablished = new EventEmitter<boolean>();

  private hubConnection: HubConnection;
  private isConnected = false;
  private callStopConnection = false;
  private serverURL: string;

  protected hubConnectionSelected: HubConnectionEnum = null;
  protected hubConnectionCollection = HubConnectionEnum;
  protected connectionIsEstablished = false;

  constructor(protected sessionService: SessionService) {
    const index = environment.apiUrl.indexOf("api");
    this.serverURL = "http://3.218.252.91/";
  }

  public sendMessage(message: string) {
    this.checkConnectionState();

    if (this.isConnected) {
      this.hubConnection.invoke("NewMessage", message);
      // .then((res) => console.log('RESULT ' + res))
      // .catch((err) => console.log('CATCH' + err));
    }
  }

  joinGroup(groupId: string) {
    this.checkConnectionState();
    if (this.isConnected) {
      this.hubConnection.invoke("JoinGroup", groupId);
      // .then(() => console.log('Group joined'))
      // .catch((err) => console.log(err));
    }
  }

  checkConnectionState() {
    if (!this.isConnected) {
      this.startConnection();
    }
  }

  public createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.serverURL}${this.getHub()}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => this.sessionService.getToken(),
      })
      .configureLogging(signalR.LogLevel.None)
      .build();
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        this.connectionEstablished.emit(true);
        this.isConnected = true;
        // this.sendMessage('RAAMP');
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  // protected registerOnServerEvents(): void {
  //   this.hubConnection.on('MessageReceived', (data: any) => {
  //     if (this.callStopConnection) {
  //       this.stopConnection();
  //     } else {
  //       this.messageReceived.emit(data);
  //     }
  //   });

  //   this.hubConnection.onclose(() => this.isConnected == false);
  // }

  public disconnect() {
    this.hubConnection
      .stop()
      .then(() => (this.isConnected = false))
      .catch((err) => console.log(err));
  }

  stopConnection() {
    this.hubConnection
      .invoke("StopConnection")
      .then((res) => {
        /*console.log(res)*/
      })
      .catch((err) => console.log(err));
  }

  protected getHub() {
    return this.hubConnectionCollection[this.hubConnectionSelected];
  }

  /**
   * Used on Receive From Server
   * @param eventName Event Name
   * @param fun CallBack Function
   */
  onServerEvents<T>(eventName: string, fun: (object: T) => void): void {
    return this.hubConnection.on(eventName, fun);
  }

  /**
   * Used On send to server
   * @param eventName Event Name
   * @param arg Arguments as string
   * @returns  Promise<void>
   */
  sendEvents(eventName: string, arg: any): Promise<void> {
    return this.hubConnection.send(eventName, ...arg);
  }

 
}
