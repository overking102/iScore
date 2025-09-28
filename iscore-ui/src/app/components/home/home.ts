import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Often needed for directives
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. IMPORT FORMSMODULE
import { HttpClientModule } from '@angular/common/http'; // <--- 1. IMPORT THIS
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { IscoreService, InquiryResponse, ScoreDataResponse  } from '../../services/iscore';
import { MatSelectModule } from '@angular/material/select'; // For the 'segment' dropdown
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule,RouterOutlet,HttpClientModule,MatFormFieldModule,MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  title = 'iScore Credit Inquiry';

    nationalIdInput: string = '';
    scoreResponse: InquiryResponse | null = null;
    errorMessage: string | null = null;
    isLoading: boolean = false;


     newNationalId: string = '';
     newSegment: string = 'default'; // Set a default value for the dropdown
     createResponse: ScoreDataResponse | null = null;
     createErrorMessage: string | null = null;

    constructor(private iscoreService: IscoreService) {}

    checkScore(): void {
      this.isLoading = true;
      this.scoreResponse = null;
      this.errorMessage = null;

      if (!this.nationalIdInput) {
          this.errorMessage = 'National ID cannot be empty.';
          this.isLoading = false;
          return;
      }

      this.iscoreService.getScore(this.nationalIdInput).subscribe({
        next: (data) => {
          this.scoreResponse = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = `Error: ${err.error.error || 'Could not reach server'}`;
          this.isLoading = false;
        }
      });
    }

    createNewProfile(): void {
      // 1. Reset previous state and set loading flag
      this.isLoading = true;
      this.createResponse = null;
      this.createErrorMessage = null;
      this.iscoreService.createProfile(this.newNationalId, this.newSegment).subscribe({
        // 3a. This runs on a successful API response
        next: (data) => {
              this.createResponse = data;
              this.isLoading = false;
            },
            // 3b. This runs when the API returns an error
            error: (err) => {
              this.createErrorMessage = `Error: ${err.error.error || 'Failed to create profile'}`;
              this.isLoading = false;
            }
          });

        }

}
