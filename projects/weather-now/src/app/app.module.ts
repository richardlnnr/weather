import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { NgxCurrentWeatherService, NgxApiModule, NgxApiModuleOptions } from '@weather-lib/ngx-api';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather/weather.component';
import { MenuComponent } from './menu/menu.component';
import { NgxCacheModule } from '@weather-lib/ngx-cache';
import { environment } from '../environments/environment';

const apiOptions: NgxApiModuleOptions = {
  weatherNowApiKey: environment.weatherNowApiKey
};

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    WeatherComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxApiModule.forRoot(apiOptions),
    NgxCacheModule
  ],
  providers: [
    NgxCurrentWeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
