import { MainOptions, MainFactory } from './weather/main';
import { CoordOptions, CoordFactory } from './weather/coord';
import { WeatherOptions, WeatherFactory } from './weather/weather';
import { WindOptions, WindFactory } from './weather/wind';
import { CloudsOptions, CloudsFactory } from './weather/clouds';
import { SysOptions } from './weather/sys';
import { populate, arrayPopulate } from './base-functions';

export interface CurrentWeatherOptions {
    id: number;
    name: string;
    cod: number;
    coord: CoordOptions;
    weather: WeatherOptions[];
    base: string;
    main: MainOptions;
    visibility: number;
    wind: WindOptions;
    clouds: CloudsOptions;
    dt: number;
    sys: SysOptions;
}

class CurrentWeather implements CurrentWeatherOptions {
    id: number;
    name: string;
    cod: number;
    coord: CoordOptions;
    weather: WeatherOptions[];
    base: string;
    main: MainOptions;
    visibility: number;
    wind: WindOptions;
    clouds: CloudsOptions;
    dt: number;
    sys: SysOptions;
}

function factory(rawData: CurrentWeatherOptions) {

    const currentWeather = new CurrentWeather();

    populate(['id', 'name', 'cod', 'base', 'visibility', 'dt'], rawData, currentWeather);
    currentWeather.coord = CoordFactory(rawData.coord);
    currentWeather.weather = arrayPopulate('weather', rawData, WeatherFactory);
    currentWeather.main = MainFactory(rawData.main);
    currentWeather.wind = WindFactory(rawData.wind);
    currentWeather.clouds = CloudsFactory(rawData.clouds);

    return currentWeather;
}

export {
    CurrentWeather,
    factory as CurrentWeatherFactory
};
