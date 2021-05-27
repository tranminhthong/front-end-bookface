import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friend} from '../Friend';
import {User} from '../user';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/user-profile/${id}`);
  }

  updateUserProfile(id: number, userUpdate: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/users/update-profile/${id}`, userUpdate);
  }

  getFriendByDoubleId(senderId: number, receiverId: number): Observable<Friend> {
    return this.http.get(`${API_URL}/friend/search/${senderId}/${receiverId}`);
  }

  addFriendInFriendsUser(friendShip: Friend): Observable<Friend> {
    return this.http.post<Friend>(`${API_URL}/friend/add-waiting`, friendShip);
  }

  getAllFriend(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/list-friend/${id}`);
  }

  unFriend(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/friend/unfriend/${id}`);
  }

  accept(friendShip: Friend): Observable<Friend> {
    return this.http.post<Friend>(`${API_URL}/friend/add-accept`, friendShip);
  }

  getMutualFriends(id1: number, id2: number): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/mutual-friends/${id1}/${id2}`);
  }

  searchUserByKey(key: string, page: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/users/search?key=${key}&page=${page}&size=10`);
  }

  getAllUserActivated(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/admin/user-activated')
  }

  getAllUserBlocked(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/admin/user-blocked')
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/admin/users')
  }

  blockAUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/admin/user-block/${id}`)
  }

  unBlockAUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/admin/user-unblock/${id}`)
  }
}
