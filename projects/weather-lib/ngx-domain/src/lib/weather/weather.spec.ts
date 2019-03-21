import { WeatherOptions, WeatherFactory, Weather } from './weather';

describe('Class: Weather', () => {
    let weatherMock: WeatherOptions;
    weatherMock = {
        id: 300,
        main: 'Drizzle',
        description: 'light intensity drizzle',
        icon: '09d'
      };

    it('should create an instance of Weather with the factory', () => {
        const instanceClass = WeatherFactory(weatherMock);

        expect(instanceClass instanceof Weather).toBeTruthy();
        expect(instanceClass.id).toEqual(300);
        expect(instanceClass.main).toEqual('Drizzle');
        expect(instanceClass.description).toEqual('light intensity drizzle');
        expect(instanceClass.icon).toEqual('09d');
    });
});
