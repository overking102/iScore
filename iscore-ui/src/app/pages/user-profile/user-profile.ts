import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'


@Component({
  selector: 'app-user-profile',
  imports: [MatButtonModule, MatFormFieldModule, MatCardModule, MatIconModule, MatInputModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile {
    imageUrl: string | ArrayBuffer = 'assets/default-avatar.png';
    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
           if (reader.result) {
             this.imageUrl = reader.result;
           }
      }
    }
}
}
