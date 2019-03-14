import { TestBed } from '@angular/core/testing';
import { NgxCurrentWeatherService } from './current-weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrentWeatherApiModel } from '../model/current-weather.api.model';
import { CurrentWeather } from '@weather-lib/ngx-domain';

describe('NgxCurrentWeatherService', () => {
  let httpTestingController: HttpTestingController;
  let currentWeatherService: NgxCurrentWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ NgxCurrentWeatherService ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    currentWeatherService = TestBed.get(NgxCurrentWeatherService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(currentWeatherService).toBeTruthy();
  });

  it('#getCurrentWeather() should returned expected currentWeather', () => {
    const mockCurretWeather: CurrentWeatherApiModel = {
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
        temp_min: 279.15,
        temp_max: 281.15
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
      cod: 200
    };

    currentWeatherService.getCurrentWeather('London', 'GB').subscribe(
      (weather) => {
        expect(weather.id).toEqual(mockCurretWeather.id);
        expect(weather instanceof CurrentWeather).toBeTruthy();
      },
      fail
    );

    const url = `${currentWeatherService.baseUrl}?q=London,GB&${currentWeatherService.apiKey}`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock heroes
    req.flush(mockCurretWeather);
  });
});
