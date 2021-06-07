import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Message} from '../chat-box/message-model';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private http: HttpClient) {
  }

  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(API_URL + '/chats', message);
  }

  getMessage(id: number): Observable<Message> {
    return this.http.get<Message>(API_URL + `/chats/${id}`);
  }

  getAllChat(user1Id: number, user2Id: number, size: number): Observable<Message[]> {
      return this.http.get<Message[]>(`${API_URL}/chats?userId1=${user1Id}&userId2=${user2Id}&size=${size}`)
  }
}
