import { SysOptions, SysFactory, Sys } from './sys';

describe('Class: Sys', () => {
    let sysMock: SysOptions;
    sysMock = {
        id: 5091,
        type: 1,
        message: 0.0103,
        country: 'GB',
        sunrise: 1485762037,
        sunset: 1485794875
    };

    it('should create an instance of Sys with the factory', () => {
        const instanceClass = SysFactory(sysMock);

        expect(instanceClass instanceof Sys).toBeTruthy();
        expect(instanceClass.id).toEqual(5091);
        expect(instanceClass.type).toEqual(1);
        expect(instanceClass.message).toEqual(0.0103);
        expect(instanceClass.country).toEqual('GB');
        expect(instanceClass.sunrise).toEqual(1485762037);
        expect(instanceClass.sunset).toEqual(1485794875);
    });
});
