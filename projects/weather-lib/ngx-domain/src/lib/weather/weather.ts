import { populate } from '../base-functions';

export interface WeatherOptions {
    id: number;
    main: string;
    description: string;
    icon: string;
}

class Weather implements WeatherOptions {
    id: number;
    main: string;
    description: string;
    icon: string;
}

function factory(rawData: WeatherOptions) {

    const weather = new Weather();

    populate(['id', 'main', 'description', 'icon'], rawData, weather);

    return weather;
}

export {
    Weather,
    factory as WeatherFactory
};
