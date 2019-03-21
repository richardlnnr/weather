import { Coord, CoordOptions, CoordFactory } from './coord';

describe('Class: Coord', () => {
    let coordMock: CoordOptions;
    coordMock = {
        lat: 5565,
        lon: 8789
    };

    it('should create an instance of Coord with the factory', () => {
        const instanceClass = CoordFactory(coordMock);

        expect(instanceClass instanceof Coord).toBeTruthy();
        expect(instanceClass.lat).toEqual(5565);
        expect(instanceClass.lon).toEqual(8789);
    });
});
