import { populate } from '../base-functions';

export interface CoordOptions {
    lon: number;
    lat: number;
}

class Coord implements CoordOptions {
    lon: number;
    lat: number;
}

function factory(rawData: CoordOptions) {

    const coord = new Coord();

    populate(['lon', 'lat'], rawData, coord);

    return coord;
}

export {
    Coord,
    factory as CoordFactory
};
