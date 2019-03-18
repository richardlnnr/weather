import { InjectionToken } from '@angular/core';

export interface NgxApiModuleOptions {
    weatherNowApiKey: string;
}

export const NGX_API_OPTIONS = new InjectionToken('NGX_API_OPTIONS');
