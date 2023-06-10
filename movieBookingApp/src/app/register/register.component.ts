import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'loginID': new FormControl(null, Validators.required),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required),
      'contactNumber': new FormControl(null, Validators.required),
      'secretQuestion': new FormControl(null, Validators.required),
      // Uncomment the line below if you want to use the userRole field
      // 'userRole': new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    this.apiService.registerUser(this.registerForm.value).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }
  
}
