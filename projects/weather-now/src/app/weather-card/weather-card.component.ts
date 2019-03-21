import { Component, OnInit, Input } from '@angular/core';
import { NgxCurrentWeatherService } from '@weather-lib/ngx-api';
import { CurrentWeatherOptions, CurrentWeatherFactory } from '@weather-lib/ngx-domain';
import { map, startWith, timeInterval } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input()
  city: string;

  @Input()
  country: string;

  @Input()
  displayMoreInformation: boolean;

  currentWeather$: Observable<CurrentWeatherOptions>;

  constructor(private currentWeatherService: NgxCurrentWeatherService) { }

  ngOnInit() {
    const seconds = interval(600000);

    seconds.pipe(
      timeInterval(),
      startWith(0)
    ).subscribe(() => {
      this.currentWeather$ = this.currentWeatherService
      .getCurrentWeather(this.city, this.country)
      .pipe(
        map((weather: CurrentWeatherOptions) => {
          return CurrentWeatherFactory(weather);
        })
      );
    });
  }

  getColorText(temperature: number): string {
    let textColor = '';
    // Keep temperature em Kelvin to format in Celsius or Fahrenheit
    if (temperature <= 278.15) {
      textColor = 'text-blue';
    } else if (temperature > 278.15 && temperature <= 298.15) {
      textColor = 'text-orange';
    } else {
      textColor = 'text-red';
    }

    return textColor;
  }

  getConvertedTemperature(temperature: number): number {
    let formatedTemperature = 0;
    // Kelvin to Celsius
    formatedTemperature = (temperature - 273.15);
    // Kelvin to Fahrenheit
    // formatedTemperature = (temperature - 273.15) * 9 / 5 + 32;

    return Math.round(formatedTemperature);
  }

  getRoundPressure(pressure: number): number {
    return Math.round(pressure);
  }

}
