import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Often needed for directives
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. IMPORT FORMSMODULE

import { IscoreService, InquiryResponse, ScoreDataResponse  } from './services/iscore';

@Component({
  selector: 'app-root',
  standalone: true, // This marks it as a standalone component
  imports: [CommonModule, FormsModule], // 2. ADD FORMSMODULE HERE
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
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
