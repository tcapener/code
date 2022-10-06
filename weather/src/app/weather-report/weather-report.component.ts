import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {
  private weather: string[] = ["Sunny", "Cloudy", "Rainy", "Windy"];
  private chance: string[] = ["hail", "clouds", "rain", "gusts"];

  @Input() icon: string = "";
  forcast: string = 'Loading...';

  constructor() {
    const pick1: number = Math.floor(Math.random() * this.weather.length);
    const pick2: number  = Math.floor(Math.random() * this.chance.length);
    this.forcast = `${this.weather[pick1]} with a chance of ${this.chance[pick2]}...`;
  }

  ngOnInit(): void {
  }
}
