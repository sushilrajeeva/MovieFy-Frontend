import { Ticket } from "../ticket/ticket";

export class Movie {
    movieId : number | any;
    movieName : String | any;
    theatreName : String | any;
    seatsAvailable : number | any;
    ticketList: Array<Ticket> =[];
    
}

