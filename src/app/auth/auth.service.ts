import {EventEmitter, Injectable, Output} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable, throwError} from 'rxjs';
import {SignupRequestPayload} from './signup/signup-request.payload';
import {LoginRequestPayload} from './login/login.request.payload';
import {LoginResponse} from './login/login.response.payload';
import {map, tap} from 'rxjs/operators';
import {User} from '../user/user';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() userId: EventEmitter<number> = new EventEmitter();
  @Output() userRole: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(`${API_URL}/auth/signup`, signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(`${API_URL}/auth/login`,
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);
      this.localStorage.store('userId', data.userId);
      this.localStorage.store('userRole', data.userRole)
      this.loggedIn.emit(true);
      this.username.emit(data.username);
      this.userId.emit(data.userId);
      this.userRole.emit(data.userRole);
      return true;
    }));
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>(`${API_URL}/auth/refresh/token`,
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  logout() {
    this.httpClient.post(`${API_URL}/auth/logout`, this.refreshTokenPayload,
      {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('userId');
    this.localStorage.clear('userRole');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getUserId() {
    return this.localStorage.retrieve('userId');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getRoleUser() {
    return this.localStorage.retrieve('userRole')
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getUserByUserName(username: string): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/users/${username}`);
  }

}

