import { CurrentWeatherOptions, CurrentWeatherFactory, CurrentWeather } from './current-weather';
import { CoordFactory, WeatherFactory, MainFactory, WindFactory, CloudsFactory, SysFactory } from './weather';

describe('Class: CurrentWeather', () => {
    const updatedDateMock = new Date();
    let currentWeatherMock: CurrentWeatherOptions;
    currentWeatherMock = {
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
        updatedDate: updatedDateMock
      };

    it('should create an instance of CurrentWeather with the factory', () => {
        const instanceClass = CurrentWeatherFactory(currentWeatherMock);

        expect(instanceClass instanceof CurrentWeather).toBeTruthy();

        expect(instanceClass.id).toEqual(2643743);
        expect(instanceClass.name).toEqual('London');
        expect(instanceClass.cod).toEqual(200);
        expect(instanceClass.updatedDate).toEqual(updatedDateMock);
        expect(instanceClass.dt).toEqual(1485789600);
        expect(instanceClass.visibility).toEqual(10000);
        expect(instanceClass.base).toEqual('stations');

        expect(instanceClass.coord).toEqual(CoordFactory(currentWeatherMock.coord));
        expect(instanceClass.weather[0]).toEqual(WeatherFactory(currentWeatherMock.weather[0]));
        expect(instanceClass.main).toEqual(MainFactory(currentWeatherMock.main));
        expect(instanceClass.wind).toEqual(WindFactory(currentWeatherMock.wind));
        expect(instanceClass.clouds).toEqual(CloudsFactory(currentWeatherMock.clouds));
        expect(instanceClass.sys).toEqual(SysFactory(currentWeatherMock.sys));
    });
});
