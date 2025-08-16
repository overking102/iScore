import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the shape of the data we expect back from the API
export interface InquiryResponse {
  nationalId: string;
  iScore: number;
  segment: string;
}
export interface ScoreDataResponse {
  nationalId: string;
  segment: string;
  generatedScore: number; // The backend field name is generatedScore
}

@Injectable({
  providedIn: 'root'
})
export class IscoreService {

  // The URL of your Spring Boot inquiry endpoint
  private apiUrl = 'http://localhost:8080/inquiry';
  private createapiUrl = 'http://localhost:8080/inquiry/create';

  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to the backend to get a user's credit score.
   * @param {string} nationalId The national ID to be checked.
   * @returns {Observable<InquiryResponse>} An Observable containing the API response.
   */
  getScore(nationalId: string): Observable<InquiryResponse> {
    const requestBody = { nationalId: nationalId };
    return this.http.post<InquiryResponse>(this.apiUrl, requestBody);
  }

createProfile(nationalId: string, segment: string): Observable<ScoreDataResponse> {
    // The request body must match the ScoreData DTO on the backend.
    // It needs both nationalId and segment.
    const requestBody = {
      nationalId: nationalId,
      segment: segment
    };

    // Perform the HTTP POST request to the /create endpoint
    return this.http.post<ScoreDataResponse>(this.createapiUrl, requestBody);
  }


}
