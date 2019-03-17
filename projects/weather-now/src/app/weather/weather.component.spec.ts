import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrentWeatherOptions } from '@weather-lib/ngx-domain';
import { of } from 'rxjs';
import { NgxCurrentWeatherService } from '@weather-lib/ngx-api';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let getCurrentWeatherSpy: any;

  beforeEach(async(() => {
    const weaterMock: CurrentWeatherOptions = {
      coord: {
        lon: -0.13,
        lat: 51.51
      },
      weather: [
        {
          id: 300,
          main: 'Drizzle',
          description: 'light intensity drizzle',
          icon: '09d'
        }
      ],
      base: 'stations',
      main: {
        temp: 280.32,
        pressure: 1012,
        humidity: 81,
        tempMin: 279.15,
        tempMax: 281.15
      },
      visibility: 10000,
      wind: {
        speed: 4.1,
        deg: 80
      },
      clouds: {
        all: 90
      },
      dt: 1485789600,
      sys: {
        type: 1,
        id: 5091,
        message: 0.0103,
        country: 'GB',
        sunrise: 1485762037,
        sunset: 1485794875
      },
      id: 2643743,
      name: 'London',
      cod: 200,
      updatedDate: new Date(2019, 3, 16, 15, 52, 30)
    };

    const currentWeatherService = jasmine.createSpyObj('NgxCurrentWeatherService', ['getCurrentWeather']);
    getCurrentWeatherSpy = currentWeatherService.getCurrentWeather.and.returnValue(of(weaterMock));

    TestBed.configureTestingModule({
      declarations: [ WeatherComponent, WeatherCardComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: NgxCurrentWeatherService, useValue: currentWeatherService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
