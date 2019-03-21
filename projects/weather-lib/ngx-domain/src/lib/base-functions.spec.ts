import { remap, populate } from './base-functions';


interface RemapCodeOptions {
    temp_max: number;
}

class RemapCode {
    tempMax: number;
}

describe('Class: base-functions', () => {
    let remapedClass: RemapCode;
    let cloudMock: RemapCodeOptions;
    let remapProps: Array<[string, string]>;

    beforeEach(() => {
        remapedClass = new RemapCode();
        cloudMock = {
            temp_max: 5
        };
        remapProps = [
            ['tempMax', 'temp_max']
        ];
    });

    afterEach(() => {
        remapedClass = null;
    });

    describe('remap function', () => {

        it('should remap the properties of an interface into an object', () => {
            remap(remapProps, cloudMock, remapedClass);
            expect(remapedClass.tempMax).toEqual(5);
        });

        it('should remap the properties of an interface into an object with extra wrong properties', () => {
            remapProps.push(['tempMin', 'temp_min']);
            remap(remapProps, cloudMock, remapedClass);
            expect(remapedClass.tempMax).toEqual(5);
        });

        it('should remap a null rawData object', () => {
            remap(remapProps, null, remapedClass);
            expect(remapedClass.tempMax).toBeUndefined();
        });
    });

    describe('populate function', () => {

        let populatedClass: RemapCode;

        beforeEach(() => {
            populatedClass = new RemapCode();
            remap(remapProps, cloudMock, remapedClass);
        });

        afterEach(() => {
            populatedClass = null;
        });

        it('should populate the properties from an object into a new object', () => {
            populate(['tempMax'], remapedClass, populatedClass);
            expect(populatedClass.tempMax).toEqual(5);
        });

        it('should populate the properties from an object into a new object with extra wrong properties', () => {
            populate(['tempMax', 'tempMin'], remapedClass, populatedClass);
            expect(populatedClass.tempMax).toEqual(5);
        });

        it('should populate a null rawData object', () => {
            populate(['tempMax'], null, populatedClass);
            expect(populatedClass.tempMax).toBeUndefined();
        });
    });
});
