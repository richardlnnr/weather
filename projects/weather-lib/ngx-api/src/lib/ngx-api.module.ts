import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxApiModuleOptions, NGX_API_OPTIONS } from './ngx-api.options';
import { NgxCurrentWeatherService } from './weather/resources/current-weather.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    NgxCurrentWeatherService
  ]
})

export class NgxApiModule {
  static forRoot(options: NgxApiModuleOptions): ModuleWithProviders {
      return {
          ngModule: NgxApiModule,
          providers: [
              {
                  provide: NGX_API_OPTIONS,
                  useValue: options
              }
          ]
      };
  }
}
