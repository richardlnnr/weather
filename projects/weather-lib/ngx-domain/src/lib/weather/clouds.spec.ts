import { CloudsOptions, Clouds, CloudsFactory } from './clouds';

describe('Class: Clouds', () => {
    let cloudMock: CloudsOptions;
    cloudMock = {
        all: 5
    };

    it('should create an instance of Clouds with the factory', () => {
        const instanceClass = CloudsFactory(cloudMock);

        expect(instanceClass instanceof Clouds).toBeTruthy();
        expect(instanceClass.all).toEqual(5);
    });
});
