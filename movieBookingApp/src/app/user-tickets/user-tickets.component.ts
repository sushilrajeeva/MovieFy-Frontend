import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie-service.service';
import { Ticket } from '../model/ticket';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent {

  tickets!: Ticket[];  // This should be populated with the tickets from the API
displayedColumns: string[] = ['transactionId', 'movieName', 'seatsBooked', 'seatsAvailable'];


  constructor(private route: ActivatedRoute, private movieService: MovieService, private http: HttpClient, private router: Router) { }

  ngOnInit(){
    this.getAllTickets();
  }

  getAllTickets() {
    let userItem = sessionStorage.getItem('user');

    if (userItem !== null) {
      let user = JSON.parse(userItem);
      console.log("UserName -> ", user.userName);
      
      const url = `http://localhost:8082/api/v1.0/ticket/user/getAllTickets/${user.userName}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
      };

      this.http.get<any>(url, httpOptions).subscribe(
        (ticketList: any) => {
          console.log('Received ticket list', ticketList);
          if(Array.isArray(ticketList)) {
            this.tickets = ticketList;
          } else {
            console.error('Data received from server is not an array');
          }
        },
        (error) => {
          console.error(error);
          // Handle error response here
        }
      );
      
      

    } else {
      console.error("User not found in sessionStorage");
    }
}


}
