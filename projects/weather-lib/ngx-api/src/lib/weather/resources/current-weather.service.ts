import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CurrentWeatherOptions, CurrentWeather, MainOptions, remap, Main, populate
} from '@weather-lib/ngx-domain';
import { map } from 'rxjs/operators';
import { CurrentWeatherApiModel, MainApiModel } from '../model';

@Injectable({
  providedIn: 'root'
})
export class NgxCurrentWeatherService {

  private readonly remapProps: Array<[string, string]> = [
    ['temp', 'temp'],
    ['pressure', 'pressure'],
    ['humidity', 'humidity'],
    ['tempMin', 'temp_min'],
    ['tempMax', 'temp_max']
  ];

  private currentWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?q=Joinville,br&appid=ebc13b9317e3997e0f3d4fd53dfa1964';
  url = `https://cors-anywhere.herokuapp.com/${this.currentWeatherEndpoint}`;

  constructor(private http: HttpClient) { }

  getCurrentWeather(): Observable<CurrentWeatherOptions> {
    return this.http.get<CurrentWeatherApiModel>(this.url).pipe(
      map((rawData) => {
        const newData: CurrentWeatherOptions = new CurrentWeather();
        newData.main = this.convertMain(rawData.main);
        populate(
          [
            'id', 'name', 'cod', 'coord', 'weather', 'base',
            'visibility', 'wind', 'clouds', 'dt', 'sys'
          ], rawData, newData);
        return newData;
      })
    );
  }

  private convertMain(rawData: MainApiModel): MainOptions {
    const newData: MainOptions = new Main();
    remap(this.remapProps, rawData, newData);
    return newData;
  }
}

