import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageServiceService } from '../message-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  messageSubscription!: Subscription;

  constructor(private http: HttpClient, private messageService: MessageServiceService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'fullName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'userPassword': new FormControl(null, Validators.required),
      'secretQuestion': new FormControl(null, Validators.required),
      'secretAnswer': new FormControl(null, Validators.required),
    });

    // Subscribe to messages
    this.messageSubscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        console.log("Message", message);
        alert(message); // Display the message
        this.messageService.setMessage(''); // Clear the message
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    this.messageSubscription.unsubscribe();
  }

  onSubmit(): void {
    console.log(this.registerForm.value);
    this.registerUser(this.registerForm.value);
  }

  registerUser(userData: any): void {
    const payload = {
      ...userData,
      "role": [
        {
          "roleName": "user",
          "roleDesc": "For users"
        }
      ]
    };

    this.http.post('http://localhost:9091/registerNewUser', payload).subscribe(
      response => {
        console.log(response);
        // handle your response here
        this.messageService.setMessage('Registration successful!'); // Set the success message
        this.registerForm.reset(); // Reset the form
        this.router.navigate(['/login']); // Navigate to login after successful registration
      },
      error => {
        console.error(error);
        this.messageService.setMessage(`Oops Something went wrong !` + error); // Set the success message
        this.registerForm.reset(); // Reset the form
        this.router.navigate(['/login']); // Navigate to login after successful registration
        // handle error here
      }
    );
  }
}
