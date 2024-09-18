import { Component, OnInit } from '@angular/core';
import { ServiesService } from '../servies.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currencies: any = {}; // To store API response
  fromCurrency: string = 'USD'; // Default value for "from" currency
  toCurrency: string = 'EGP';   // Default value for "to" currency
  amount: any = 1;         // Default amount for conversion
  convertedAmount: any = 0;  // Result of conversion

  constructor(private ServiesService: ServiesService) {}

  ngOnInit(): void {
    this.ServiesService.getCurrencies().subscribe(
      (data) => {
        this.currencies = data.currencies;
      },
      (error) => {
        console.error('Error fetching currencies:', error);
      }
    );
    
    // Perform initial conversion
    this.convertCurrency();
  }

  convertCurrency(): void {
    this.ServiesService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount).subscribe(
      (data: any) => {
        // Check if 'result' property exists and contains the conversion data
        if (data && data.result && data.result[this.toCurrency] !== undefined) {
          this.convertedAmount = data.result[this.toCurrency]; // Get the value for the 'toCurrency'
        } else {
          console.error('Unexpected data format:', data);
        }
      },
      (error) => {
        console.error('Error converting currency:', error);
      }
    );
  }

  onCurrencyChange(): void {
    this.convertCurrency(); // Recalculate conversion when currencies change
  }

  onAmountChange(): void {
    if (this.amount <= 0) {
      this.convertedAmount = 0;
    } else {
      this.convertCurrency(); // Recalculate conversion when amount changes
    }
  }
}