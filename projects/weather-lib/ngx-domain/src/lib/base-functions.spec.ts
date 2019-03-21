import { remap } from './base-functions';

interface RemapCodeOptions {
    temp_max: number;
}

class RemapCode {
    tempMax: number;
}

describe('Class: base-functions', () => {

    describe('remap function', () => {
        const cloudMock: RemapCodeOptions = {
            temp_max: 5
        };

        let instanceClass: RemapCode;

        beforeEach(() => {
            instanceClass = new RemapCode();
        });

        afterEach(() => {
            instanceClass = null;
        });

        it('should remap the properties of an interface into an object', () => {
            const remapProps: Array<[string, string]> = [
                ['tempMax', 'temp_max']
            ];
            remap(remapProps, cloudMock, instanceClass);
            expect(instanceClass.tempMax).toEqual(5);
        });

        it('should remap the properties of an interface into an object with extra wrong properties', () => {
            const remapProps: Array<[string, string]> = [
                ['tempMin', 'temp_min'],
                ['tempMax', 'temp_max']
            ];
            remap(remapProps, cloudMock, instanceClass);
            expect(instanceClass.tempMax).toEqual(5);
        });

        it('should remap a null rawData object', () => {
            const remapProps: Array<[string, string]> = [
                ['tempMax', 'temp_max']
            ];
            remap(remapProps, null, instanceClass);
            expect(instanceClass.tempMax).toBeUndefined();
        });
    });
});
