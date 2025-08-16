
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient  } from '@angular/common/http';

import { App } from './app';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient()
  ]
};
