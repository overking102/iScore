import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // 1. Import it here


@Component({
  selector: 'app-login',
   imports: [ReactiveFormsModule,RouterLink, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
   standalone: true, // <--- MAKE IT STANDALONE
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
    errorMessage = '';

    constructor(
      private fb: FormBuilder,
        private authService: AuthService,
      private router: Router,
      private icons: MatIconModule
    ) { }

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
          return;
        }

        this.authService.login(this.loginForm.value).subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            // Assuming your service handles token storage
            this.router.navigate(['/home']); // Navigate to the home/dashboard page
          },
          // Updated error handling block
          error: (err: HttpErrorResponse) => {
            console.error('Login failed:', err);
            if (err.error instanceof ProgressEvent) {
              // This is a client-side network error
              this.errorMessage = 'A network error occurred. Please try again later.';
            } else {
              // This is an error from the backend (e.g., invalid credentials)
              this.errorMessage = 'Invalid username or password. Please try again.';
            }
          }
        });
      }
  }


