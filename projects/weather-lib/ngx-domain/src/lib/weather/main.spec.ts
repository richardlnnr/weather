import { MainOptions, MainFactory, Main } from './main';

describe('Class: Main', () => {
    let mainMock: MainOptions;
    mainMock = {
        temp: 289,
        pressure: 1256,
        humidity: 87,
        tempMin: 281,
        tempMax: 293,
        seaLevel: 1250,
        grndLevel: 1256
    };

    it('should create an instance of Main with the factory', () => {
        const instanceClass = MainFactory(mainMock);

        expect(instanceClass instanceof Main).toBeTruthy();
        expect(instanceClass.temp).toEqual(289);
        expect(instanceClass.pressure).toEqual(1256);
        expect(instanceClass.humidity).toEqual(87);
        expect(instanceClass.tempMin).toEqual(281);
        expect(instanceClass.tempMax).toEqual(293);
        expect(instanceClass.seaLevel).toEqual(1250);
        expect(instanceClass.grndLevel).toEqual(1256);
    });
});
