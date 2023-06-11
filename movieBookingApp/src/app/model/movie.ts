import { Ticket } from './ticket';

export class Movie {
  movieId: number;
  movieName: string;
  theatreName: string;
  seatsAvailable: number;
  bookedSeats: number;
  ticketList: Ticket[];

  constructor(
    movieId: number,
    movieName: string,
    theatreName: string,
    seatsAvailable: number,
    bookedSeats: number,
    ticketList: Ticket[]
  ) {
    this.movieId = movieId;
    this.movieName = movieName;
    this.theatreName = theatreName;
    this.seatsAvailable = seatsAvailable;
    this.bookedSeats = bookedSeats;
    this.ticketList = ticketList;
  }
}
