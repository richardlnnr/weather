import { populate } from '../base-functions';

export interface CloudsOptions {
    all: number;
}

class Clouds implements CloudsOptions {
    all: number;
}

function factory(rawData: CloudsOptions) {

    const clouds = new Clouds();

    populate(['all'], rawData, clouds);

    return clouds;
}

export {
    Clouds,
    factory as CloudsFactory
};
