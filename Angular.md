---
toc:
  depth_from: 1
  depth_to: 6
  ordered: false
---
Version 0.1 2022-07-20
# Angular Notes {.top}
## Table of Contents 
[TOC]

## Introduction
[Back to Top](#top)

These are rough notes written by Travis for his own use. You might find them useful or you might not. This is not a manual or a tutorial and no warranty is implied.

Parts of this document are based on "Angular 6 for Enterprise-Ready Web
Applications" by Doguhan Uluca; published by Packt Publishing.
## FAQ
#### Q: How do I view this Markdown document with the table of contents and enhanced syntax highlighting?
A: Use the VS Code plug-in called [Markdown Preview Enhanced](https://github.com/shd101wyy/vscode-markdown-preview-enhanced).

A2: If you don't want to use the plug-in, don't forget that VS Code has a built-in Markdown preview. Just click on the icon in the upper-right corner of the editor pane.

![][image_ref_markdown_icon]
#### Q: Why does every command line example start with a `$`?
A: The `$` character is the prompt in GitBash. Don't actually type it.

#### Q: If I want to use Powershell instead of GitBash what do I need to do?
A: You need to alter your security settings so that Powershell can execute scripts. Go into Powershell and type the following:
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Follow the prompts and be sure you know what you're doing.

#### Q: How do I see a list of npm packages installed globally?
A:
```bash
$ npm list -g --depth 0
```
`--depth 0` displays the top-level packages only and not all the sub-packages.
#### Q: Where is the global `node_modules` directory stored?
A: The commands `npm root` and `npm root -g` will tell you the effective installation directory of your npm packages.
##### In Windows:
`C:\Users\admin\AppData\Roaming\npm\node_modules`
##### In macOS:
`/usr/local/lib/node_modules`


## Set Up Your Project
[Back to Top](#top)
[Angular.io: Set up the local environment](https://angular.io/guide/setup-local)
### Install the Angular CLI
The Angular CLI is a suite of command line tools that assist you in creating an Angular application and its components. Assuming you have Node.js installed, go into a GitBash prompt (or Powershell) and type:
```bash
$ sudo npm install -g @angular/cli@latest
```

### Starting an Angular Project
```bash
$ sudo ng new my-project
```
Using admin privileges to create the project is important in macOS and Linux. The very first time you create an Angular project could take a long time (e.g. 10 minutes).

### Adding Angular Material to a Project
```bash
$ sudo ng add @angular/material
```
## Angular Components
[Back to Top](#top)
### Add a New Component to a Project
Make sure you are in your project directory. For example `code/weather`
```bash
$ ng generate component weather-report
```
or
```bash
$ ng g c weather-report
```
This will create 
```
code/weather/src/apps/weather-report
  |-weather-report.component.css
  |-weather-report.component.html
  |-weather-report.component.spec.ts
  |-weather-report.component.ts
```
Inside `weather-report.component.ts` will be a component with the selector `app-weather-report`.
### The Anatomy of Angular Components
This root component uses an inline template and inline CSS.
```ts {.line-numbers}
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
    <div class="info">
      Sunny with a chance of hail.
    </div>
  </div>`,
styles: ['h1 {color: red;} h2 {color: green;}']
})
export class AppComponent {
  title: string = 'AccuWeather';
  constructor() {}
}
```
This component uses an inline template and an array of CSS styles.
```ts {.line-numbers}
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
    <div class="info">
      Sunny with a chance of hail.
    </div>
  </div>`,
styles: [
  'h1 {color: red;}', 
  'h2 {color: green;}'
]
})
export class AppComponent {
  title: string = 'AccuWeather';
  constructor() {}
}
```

This component uses files for the template and CSS.
```ts {.line-numbers}
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'AccuWeather';
  constructor() {}
}
```
### A Little Bit More Complex Component
```ts {.line-numbers}
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
    <div class="info">
      {{forcast}}
    </div>
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
})
export class AppComponent {
  private weather: string[] = ["Sunny", "Cloudy", "Rainy", "Windy"];
  private chance: string[] = ["hail", "clouds", "rain", "gusts"];

  title: string = 'AccuWeather';
  forcast: string = 'Loading...';

  constructor() {
    const pick1: number = Math.floor(Math.random() * this.weather.length);
    const pick2: number  = Math.floor(Math.random() * this.chance.length);
    this.forcast = `${this.weather[pick1]} with a chance of ${this.chance[pick2]}...`;
  }
}
```
## Passing Data from a Parent Prop to a Child @Input prop
The following is the child component. It will be passed a Unicode icon through the prop `icon`. Look at the definition on line 12 that uses the decoration `@Input()` to identify the prop.

__weather-report.component.ts__
```ts {.line-numbers}
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
```

The HTML for this component looks like this:

__weather-report.component.html__
```ts {.line-numbers}
<div class="info">
  {{icon}} {{forcast}}
</div>
```

Next is the parent component. It defines a property called `symbol` on line 20 and assigns it a random value on lines 23-24. We pass the property to the child component on line 12. Notice the syntax: `[icon]='symbol'`. The child prop is identified by square brackets, and the parent prop is in quotes. Notice that `symbol` is defined on line 20 and its value is set on line 24. If you want to pass a string literal to `[icon]`, you must use two sets of quotes (`[icon]="'🌈'"`--see the next section).

__app.component.ts__
```ts {.line-numbers}
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
    <app-weather-report [icon]='symbol'></app-weather-report>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date: string = new Date().toLocaleDateString();
  title: string = `AccuWeather for ${this.date}`;
  symbols: string[] = ['🍁','⭐','🦅'];
  symbol: string = '🌈';
  
  constructor() {
    const pick1: number = Math.floor(Math.random() * this.symbols.length);
    this.symbol = this.symbols[pick1];
  }
}
```
## Passing String Literals to an @Input prop
```ts
<component inputField="🌈"></component>
<component [inputField]="'🍁'"></component>
<component inputField="{{'🦅'}}"></component>
```
## Adding a Service to an Angular App
```bash
$ ng generate service weather --flat false
```
or
```bash
$ ng g s weather --flat false
```
`--flat false` means to put the new service inside the app (like a component) rather than at the top level. The default is `--flat true`.

This operation will create the following files:
```
weather/src/app/weather
  |-weather.service.spec.ts
  |-weather.service.ts
```
Inside `weather.service.ts` will be
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }
}
``` 
You will need to make some changes to `app.module.ts`: see lines 7 and 18.
```js {.line-numbers}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherReportComponent } from './weather-report/weather-report.component';
import { WeatherService } from './weather/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```




---
[image_ref_markdown_icon]: data:image/png;base64,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
