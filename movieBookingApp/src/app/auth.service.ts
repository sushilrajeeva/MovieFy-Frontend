import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './model/login-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlMovieApp = 'http://localhost:8082';
  private apiUrlAuthApp = 'http://localhost:9091';

  constructor(private http: HttpClient) { }

  login(loginID: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrlMovieApp}/call/consumer/authenticate`;
    
    return this.http.post<LoginResponse>(url, { userName: loginID, userPassword: password });
  }

  forgotPassword(secretQuestion: string, secretAnswer: string, newPassword: string, userName: string): Observable<any> {
    const url = `${this.apiUrlAuthApp}/user/forgetpassword`;
    return this.http.post<any>(url, { secretQuestion, secretAnswer, newPassword, userName });
  }

  forgotUserName(email: string, password: string): Observable<string> {
    const url = `${this.apiUrlAuthApp}/username/forget/${email}/${password}`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }
  
  

}
