import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxApiModuleOptions, NGX_API_OPTIONS } from './ngx-api.options';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
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
