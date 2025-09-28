import { Component, inject  } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
 standalone: true,
  imports: [MatFormFieldModule, RouterLink, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatMenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private authService = inject(AuthService);

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  logout(): void{
    this.authService.logout();
    }

}
