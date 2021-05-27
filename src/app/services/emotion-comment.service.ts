import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {EmotionCommentPayload} from "../shared/emotions/emotion-comment/emotioncomment-payload";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
  export class EmotionCommentService {
  constructor(private http: HttpClient) { }

  sendEmotionComment(emotionCommentPayload: EmotionCommentPayload): Observable<any> {
    return this.http.post(`${API_URL}/emotions-comment`, emotionCommentPayload);
  }
}
