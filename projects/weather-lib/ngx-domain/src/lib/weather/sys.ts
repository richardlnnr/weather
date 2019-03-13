import { populate } from '../base-functions';

export interface SysOptions {
    id: number;
    type: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

class Sys implements SysOptions {
    id: number;
    type: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

function factory(rawData: SysOptions) {

    const coord = new Sys();

    populate(['id', 'type', 'message', 'country', 'sunrise', 'sunset'], rawData, coord);

    return coord;
}

export {
    Sys,
    factory as SysFactory
};
