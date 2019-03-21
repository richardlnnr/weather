import { WindOptions, WindFactory, Wind } from './wind';

describe('Class: Wind', () => {
    let windMock: WindOptions;
    windMock = {
        speed: 4.1,
        deg: 80
      };

    it('should create an instance of Wind with the factory', () => {
        const instanceClass = WindFactory(windMock);

        expect(instanceClass instanceof Wind).toBeTruthy();
        expect(instanceClass.speed).toEqual(4.1);
        expect(instanceClass.deg).toEqual(80);
    });
});
