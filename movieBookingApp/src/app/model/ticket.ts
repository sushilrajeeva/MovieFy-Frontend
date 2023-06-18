export class Ticket {
    transactionId: number;
    movie_id_fk: number;
    movieName: string;
    totalSeat: number;
    seatsAvailable: number;
    seatsBooked: number;
    userName: string;
  
    constructor(
      transactionId: number,
      movie_id_fk: number,
      movieName: string,
      totalSeat: number,
      seatsAvailable: number,
      seatsBooked: number,
      userName: string,
    ) {
      this.transactionId = transactionId;
      this.movie_id_fk = movie_id_fk;
      this.movieName = movieName;
      this.totalSeat = totalSeat;
      this.seatsAvailable = seatsAvailable;
      this.seatsBooked = seatsBooked;
      this.userName = userName;
    }
  }
  