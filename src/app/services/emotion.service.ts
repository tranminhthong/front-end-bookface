import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmotionPayload} from '../shared/emotions/emotion/emotion-payload';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class EmotionService {

  constructor(private http: HttpClient) { }

  sendEmotion(emotionPayload: EmotionPayload): Observable<any> {
    return this.http.post(`${API_URL}/emotions`, emotionPayload);
  }
}
