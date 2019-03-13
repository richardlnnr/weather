import { populate } from '../base-functions';

export interface MainOptions {
    temp: number;
    pressure: number;
    humidity: number;
    tempMin: number;
    tempMax: number;
    seaLevel: number;
    grndLevel: number;
}

class Main implements MainOptions {
    temp: number;
    pressure: number;
    humidity: number;
    tempMin: number;
    tempMax: number;
    seaLevel: number;
    grndLevel: number;
}

function factory(rawData: MainOptions) {

    const main = new Main();

    populate(['temp', 'pressure', 'humidity', 'tempMin', 'tempMax', 'seaLevel', 'grndLevel'], rawData, main);

    return main;
}

export {
    Main,
    factory as MainFactory
};
