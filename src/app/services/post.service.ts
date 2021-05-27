import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
// @ts-ignore
import {Observable} from 'rxjs';
import {PostModel} from '../post/post-model';
import {PostPayload} from '../post/create-post/post.payload';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(`${API_URL}/posts`);
  }

  createPost(postPayload: PostPayload): Observable<PostModel> {
    return this.http.post<PostModel>(`${API_URL}/posts`, postPayload);
  }

  updatePost(postPayload: PostPayload): Observable<PostModel> {
    return this.http.put<PostModel>(`${API_URL}/posts/update`, postPayload);
  }


  getAllPostsByUserId(userId: number): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${API_URL}/posts/by-user/` + userId);
  }

  deletePostById(postId: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/posts/delete/` + postId);
  }

  getPostById(postId: number): Observable<PostModel>{
    return this.http.get<PostModel>(`${API_URL}/posts/` + postId)
  }
}




