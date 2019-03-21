// Arrow functions don't work yet, I have an open issue on angular CLI to correct this
// https://github.com/angular/angular-cli/issues/13768

function populate<T>(props: string[], rawData: any, entity: T): void {
    if (!rawData) { return; }
    props.forEach(prop => {
      if (!rawData.hasOwnProperty(prop)) { return; }
      entity[prop] = rawData[prop];
    });
}

function arrayPopulate<T>(prop: string, rawData: any, factory: (item) => T): T[] {
    return Array.isArray(rawData[prop])
        ? rawData[prop].map((item: any) => factory(item) as T)
        : [] as T[];
}

function remap<T>(props: Array<[string, string]>, rawData: any, entity: T): void {
    if (!rawData) { return; }
    props.forEach(prop => {
        if (!rawData.hasOwnProperty(prop[1])) { return; }
        entity[prop[0]] = rawData[prop[1]];
    });
}

export {
    populate,
    arrayPopulate,
    remap
};
