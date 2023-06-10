import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.css']
})
export class ForgotUsernameComponent implements OnInit{

  forgotUserNameForm!: FormGroup;
  userName!: string;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = '';
    this.forgotUserNameForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    console.log(this.forgotUserNameForm.value);
    this.getUserName(this.forgotUserNameForm.value);
  }

  getUserName(data: any){
    //console.log(data);

    const email = this.forgotUserNameForm.value.email.trim();
    console.log("Email -> ", email);
    const password = this.forgotUserNameForm.value.password.trim();
    console.log("password -> ", password);


    this.authService.forgotUserName(email, password).subscribe(
      (response: any) => {
        console.log(response);
        // handle the response as a string here
        if(typeof response === 'string'){
          this.userName = response;
          console.log("username = ", this.userName);
          
        }
      },
      (error: any) => {
        console.error('HTTP Error:', error);
        // handle HTTP error here
      }
    );
    
    
    
    
    
  }



}
