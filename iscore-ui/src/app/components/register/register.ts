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
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-register',
   imports: [ReactiveFormsModule, RouterLink, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
   standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register  implements OnInit {
registerForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
      if (this.registerForm.invalid) {
        return;
      }

      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.successMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 1000);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Registration failed:', err);
          if (err.error instanceof ProgressEvent) {
            // Client-side or network error
            this.errorMessage = 'A network error occurred. Please try again later.';
          } else {
            // Backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            this.errorMessage = err.error || 'An unknown error occurred.';
          }
        }
      });
    }
}
