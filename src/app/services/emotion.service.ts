import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmotionPayload} from '../shared/emotion/emotion-payload';

@Injectable({
  providedIn: 'root'
})
export class EmotionService {

  constructor(private http: HttpClient) { }

  emotion(emotionPayload: EmotionPayload): Observable<any> {
    return this.http.post('http: localhost:8080/emotions/', emotionPayload);
  }
}
