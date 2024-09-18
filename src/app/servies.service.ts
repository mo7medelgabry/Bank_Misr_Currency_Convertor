import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ServiesService {
  private apiUrl = 'https://api.fastforex.io'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/currencies?api_key=3df0714c4a-6eb6cd6b09-sjr6fb`);
  }

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/convert?from=${from}&to=${to}&amount=${amount}&api_key=3df0714c4a-6eb6cd6b09-sjr6fb`);
  }

}
