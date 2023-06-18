import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isPopupVisible = false;
  popupMessage = '';
  isError = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      'secretQuestion': new FormControl(null, Validators.required),
      'secretAnswer': new FormControl(null, Validators.required),
      'newPassword': new FormControl(null, Validators.required),
      'userName': new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    const trimmedValues = {
      'secretQuestion': this.forgotPasswordForm.value.secretQuestion.trim(),
      'secretAnswer': this.forgotPasswordForm.value.secretAnswer.trim(),
      'newPassword': this.forgotPasswordForm.value.newPassword.trim(),
      'userName': this.forgotPasswordForm.value.userName.trim(),
    };

    this.authService.forgotPassword(trimmedValues.secretQuestion, trimmedValues.secretAnswer, trimmedValues.newPassword, trimmedValues.userName).subscribe(
      (response: any) => {
        if (response === 'ACCEPTED') {
          this.popupMessage = 'Password Reset Successful';
        } else {
          this.popupMessage = 'Password Reset Not Successful';
          this.isError = true;
        }

        this.isPopupVisible = true;
      },
      (error: any) => {
        this.popupMessage = 'An error occurred: ' + error.message; // Adjust the error message as needed
        this.isPopupVisible = true;
        this.isError = true;
      }
    );
  }

  closePopup(): void {
    this.isPopupVisible = false;
    if (!this.isError) {
      this.router.navigate(['/login']); // Navigate to the login component
    }
  }
}
