import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService, ChatMessage } from '../services/chat.service';
import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../auth/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
   @ViewChild('chatMessages') chatMessages!: ElementRef;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  currentUserId = '123'; // Replace with logged-in user ID from auth
  receiverId = ''; // Optional for private chat
  userId!: string;
  messageSubscription?: Subscription;
  user?: User;
  

  constructor(private chatService: ChatService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Start SignalR connection
    this.chatService.startConnection();
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Chat opened for user:', this.userId);
    this.user = this.authService.getUser();
    console.log('Current user:', this.user);
    // Load chat history for this specific user
    this.chatService.getChatHistory(this.userId).subscribe(history => {
      this.messages = history;
      this.scrollToBottom();
  });
    // Listen for new messages
    this.messageSubscription =  this.chatService.getMessageStream().subscribe(msg => {
      console.log('New message received:', msg);
      this.scrollToBottom();
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const user = this.authService.getUser();
    const msg: ChatMessage = {
      senderId: this.currentUserId,
      senderName: 'Me',
      email: user?.email,
      receiverId: this.userId,
      content: this.newMessage,
      timestamp: new Date()
    };

    this.chatService.sendMessage(msg)
      .then(() => {this.newMessage = ''; this.scrollToBottom();})
      .catch(err => console.error('Send error', err));
  }

  scrollToBottom(){
     setTimeout(() => {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      });
  }

  ngOnDestroy(): void {
  this.messageSubscription?.unsubscribe();
}
}
