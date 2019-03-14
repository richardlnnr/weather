import { MainApiModel } from './main.api.model';
import {
    CoordOptions, WeatherOptions, WindOptions, CloudsOptions, SysOptions
} from '@weather-lib/ngx-domain';

export interface CurrentWeatherApiModel {
    id: number;
    name: string;
    cod: number;
    coord: CoordOptions;
    weather: WeatherOptions[];
    base: string;
    main: MainApiModel;
    visibility: number;
    wind: WindOptions;
    clouds: CloudsOptions;
    dt: number;
    sys: SysOptions;
}
