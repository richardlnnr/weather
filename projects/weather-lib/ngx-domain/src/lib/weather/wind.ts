import { populate } from '../base-functions';

export interface WindOptions {
    speed: number;
    deg: number;
}

class Wind implements WindOptions {
    speed: number;
    deg: number;
}

function factory(rawData: WindOptions) {

    const wind = new Wind();

    populate(['speed', 'deg'], rawData, wind);

    return wind;
}

export {
    Wind,
    factory as WindFactory
};
