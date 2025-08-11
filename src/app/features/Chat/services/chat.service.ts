import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from 'src/environments/environment.development';


export interface ChatMessage {
  senderId: string;
  senderName: string;
  receiverId?: string;
  content: string;
  timestamp: Date;
  email?: string; // Optional for private chat
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messageReceived = new Subject<ChatMessage>();
  
  apiUrl = 'https://localhost:44372/api/chat'; // Change to your API base

  constructor(private http: HttpClient,private authService: AuthService) {}

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44372/hubs/chat', {
        accessTokenFactory: () => localStorage.getItem('token') || ''
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('Error connecting SignalR', err));

    // Listen for messages
    this.hubConnection.on('ReceiveMessage', (data: ChatMessage) => {
      this.messageReceived.next(data);
    });
  }

  sendMessage(message: ChatMessage) {
    return this.hubConnection.invoke('SendMessage', message);
  }

  getMessageStream(): Observable<ChatMessage> {
    return this.messageReceived.asObservable();
  }

  getChatHistory(userId: string, count: number = 50): Observable<ChatMessage[]> {
  return this.http.get<ChatMessage[]>(
    `${environment.BASE_URL}/Chat/history?count=${count}&userId=${userId}&addAuth=true`
  );
}
}
