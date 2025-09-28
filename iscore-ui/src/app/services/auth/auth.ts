// src/app/services/auth.service.ts

import { Injectable,inject, PLATFORM_ID  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject  } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // The URL of your Spring Boot backend
  private apiUrl = 'http://localhost:8080/auth';

  private http= inject(HttpClient);
   private router= inject(Router);
   private platformId = inject(PLATFORM_ID);
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() { }



  register(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userDetails, { responseType: 'text' });
  }

   login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' }).pipe(
        tap(response => {
          // Assuming the backend returns a token upon successful login.
          // You MUST save this token.
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('auth_token', response); // Save the actual token
            this.loggedIn.next(true); // Notify all subscribers that the user is now logged in.
          }
        })
      );
    }


  // Helper method to check if user is logged in
   isLoggedIn(): boolean {
    // First, check if the code is running in a browser environment.
  return this.loggedIn.getValue();
  }
  logout(): void {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('auth_token'); // Remove the token
        this.loggedIn.next(false); // Notify all subscribers that the user is logged out.
        this.router.navigate(['/login']);
      }
    }

  private hasToken(): boolean {
    if(isPlatformBrowser(this.platformId)){
      return !!localStorage.getItem('auth_token');
      }
    return false;
    }
}
