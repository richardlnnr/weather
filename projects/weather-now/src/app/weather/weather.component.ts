import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherCards;

  constructor() { }

  ngOnInit() {
    this.weatherCards = [
      {
        city: 'Nuuk',
        country: 'GL',
        displayMoreInformation: false
      },
      {
        city: 'Urubici',
        country: 'BR',
        displayMoreInformation: true
      },
      {
        city: 'Nairobi',
        country: 'KE',
        displayMoreInformation: false
      }
    ];
  }

}
