import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Movie } from '../model/movie';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.getAllMovies();
    //this.getMov();
    
    
  }

  // getMov(): Promise<Movie[]> {
  //   const url = 'http://localhost:8082/api/v1.0/getAllMovies';
  //   const token = sessionStorage.getItem('jwtToken');
  
  //   // Set the Authorization header with the token
  //   const headers = {
  //     'Authorization': `Bearer ${token}`
  //   };
  
  //   console.log("Final url -> ", url);
  //   console.log("Final Headers -> ", headers);
  
  //   return fetch(url, { headers })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     });
  // }
  

  // getAllMovies() {
  //   this.authService.getAllMovies().subscribe(
  //     (movies: Movie[]) => {
  //       this.movies = movies;
  //       console.log("Logging all the movies");
        
  //       console.log(this.movies); // Process the movie data as needed
  //     },
  //     (error) => {
  //       console.error('Error fetching movies:', error);
  //     }
  //   );
  // }

  getAllMovies() {
    const url = 'http://localhost:8082/api/v1.0/getAllMovies';
    const token = sessionStorage.getItem('jwtToken');
  
    console.log("Token -> ", token);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    console.log("httpOptions -> ", httpOptions);
    this.http.get<Movie[]>(url, httpOptions).subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    });
  }
  
  
  
}
