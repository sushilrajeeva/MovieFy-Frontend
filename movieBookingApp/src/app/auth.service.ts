import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from './model/login-response';
import { Observable } from 'rxjs';
import { Movie } from './model/movie';

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

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  isAdmin(): boolean {
    let userString = sessionStorage.getItem('user');
    if (userString) {
        try {
            let user = JSON.parse(userString);
            return user && user.userName === 'admin123';
        } catch (error) {
            console.error('Error parsing user data from sessionStorage', error);
            return false;
        }
    } else {
        return false;
    }
}


  logout(): void {
    sessionStorage.clear();
  }

  getAllMovies(): Observable<Movie[]> {
    const url = 'http://localhost:8082/api/v1.0/getAllMovies';
    const token = sessionStorage.getItem('jwtToken');

    console.log("Jwt token i got is ->", token);
    
  
    // Set the Authorization header with the token
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    //headers.append('Access-Control-Allow-Origin', '*');
//headers.append('Access-Control-Allow-Credentials', 'true');

  
    console.log("Final url -> ", url);
    console.log("Final Headers -> ", headers);
  
    return this.http.get<Movie[]>(url);
  }
  
  
  
  

}
