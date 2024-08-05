/// <reference types="@angular/localize" />

import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './i18n/', '.json');
}

bootstrapApplication(AppComponent, {
    providers: [
        MessageService,
      provideHttpClient(),
      provideAnimationsAsync(),
      provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes),
      importProvidersFrom(
        TranslateModule.forRoot({
          defaultLanguage: 'pl',
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        })
      )],
  })
  .catch((err) => console.error(err));
