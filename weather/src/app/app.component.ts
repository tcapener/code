import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1>
      {{title}}
    </h1>
    <div>Your city, your forecast, right now!</div>
    <h2>Current Weather</h2>
    <app-weather-report [icon]="'🍁'"></app-weather-report>
    <app-weather-report [icon]="'⭐'"></app-weather-report>
    <app-weather-report [icon]="'🦅'"></app-weather-report>
  </div>`,
  styles: [
    `h1 {
      color: red;
      text-decoration: underline;
      background-color: silver;
    }`, 
    `h2 {
      color: green;
      font-family: sans-serif;
    }`
  ]
})
export class AppComponent {
  date: string = new Date().toLocaleDateString();
  title: string = `AccuWeather for ${this.date}`;
  constructor() { }
}
