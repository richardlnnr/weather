import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardComponent } from './weather-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxCurrentWeatherService } from '@weather-lib/ngx-api';
import { of, Observable } from 'rxjs';
import { CurrentWeatherOptions } from '@weather-lib/ngx-domain';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;
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
    getCurrentWeatherSpy = currentWeatherService.getCurrentWeather.and.returnValue( of(weaterMock) );

    TestBed.configureTestingModule({
      declarations: [ WeatherCardComponent ],
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
    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    expect(getCurrentWeatherSpy.calls.any()).toBe(true);
  });

  it('should render city and contry title in a .card.header.title class', () => {
    component.city = 'Joinville';
    component.country = 'BR';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const card = compiled.querySelector('.card');
    const header = card.querySelector('.header');
    const title = header.querySelector('.title');
    expect(title.textContent).toContain('Joinville, BR');
  });

  it('should return a blue color with 50 Kelvin', () => {
    expect(component.getColorText(50)).toEqual('text-blue');
  });

  it('should return a orange color with 280 Kelvin', () => {
    expect(component.getColorText(280)).toEqual('text-orange');
  });

  it('should return a red color with 350 Kelvin', () => {
    expect(component.getColorText(350)).toEqual('text-red');
  });

  it('should convert 315,15 Kelvin to 42 Celsius', () => {
    expect(component.getConvertedTemperature(315.15)).toEqual(42);
  });

  it('should return a rounded pressure 260.4 to 260 Kevin', () => {
    expect(component.getRoundPressure(260.4)).toEqual(260);
  });
});
