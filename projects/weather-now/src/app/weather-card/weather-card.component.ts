import { Component, OnInit, Input } from '@angular/core';
import { NgxCurrentWeatherService } from '@weather-lib/ngx-api';
import { CurrentWeatherOptions, CurrentWeatherFactory } from '@weather-lib/ngx-domain';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    this.currentWeather$ = this.currentWeatherService
      .getCurrentWeather(this.city, this.country)
      .pipe(
        map((weather: CurrentWeatherOptions) => {
          return CurrentWeatherFactory(weather);
        })
      );
  }

}
