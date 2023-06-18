import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bookmovie } from '../model/bookmovie';
import { MovieService } from '../movie-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  movie!: bookmovie;
  numberOfSeats = 1;
  seatsArray: number[] = [];
  isPopupVisible = false;
  popupMessage = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movie = this.movieService.getMovieData();

    console.log(this.movie.movieId, this.movie.movieName, this.movie.bookedSeats);

    for (let i = 1; i <= 100 - this.movie.bookedSeats; i++) {
      this.seatsArray.push(i);
    }
  }

  bookSeats(): void {
    let userItem = sessionStorage.getItem('user');

    if (userItem !== null) {
      let user = JSON.parse(userItem);
      console.log('UserName -> ', user.userName);
      console.log('userPassword -> ', user.userPassword);
      console.log('Number of seats booked: ', this.numberOfSeats);

      const url = `http://localhost:8082/api/v1.0/ticket/add/${this.movie.movieId}/${this.numberOfSeats}/${user.userName}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      };

      this.http.post(url, {}, httpOptions).subscribe(
        () => {
          console.log('Ticket booked successfully');
          this.router.navigate(['/user-dashboard']);
        },
        (error) => {
          console.error(error);
          this.popupMessage = 'An error occurred while booking the ticket.';
          this.isPopupVisible = true;
        }
      );
    } else {
      console.error('User not found in sessionStorage');
    }
  }

  showPopup(): void {
    this.popupMessage =
      'This ' +
      this.movie.movieName +
      " is fully booked, hence you can't book any more tickets.";
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['/user-dashboard']);
  }
}
