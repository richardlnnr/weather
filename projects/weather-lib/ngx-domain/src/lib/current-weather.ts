import { populate, arrayPopulate } from './base-functions';
import {
    CoordOptions, WeatherOptions, MainOptions, WindOptions, CloudsOptions,
    SysOptions, CoordFactory, WeatherFactory, MainFactory, WindFactory, CloudsFactory, SysFactory
} from './weather';

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
    currentWeather.sys = SysFactory(rawData.sys);

    return currentWeather;
}

export {
    CurrentWeather,
    factory as CurrentWeatherFactory
};
