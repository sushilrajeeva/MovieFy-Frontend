import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private router: Router) {}

  logout(): void {
    sessionStorage.clear();
    console.log("Am i called");
    
    this.router.navigate(['/login']);

}


}
