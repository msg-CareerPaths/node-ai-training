import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { routes } from './app.routes';
import { authTokenInterceptor } from './features/auth/interceptors/auth-token.interceptor';
import { provideEnvironmentConfiguration } from './core/providers/environment-config.provider';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideEnvironmentConfiguration({
      apiUrl: environment.apiUrl,
      production: environment.production,
    }),
    provideRouter(routes, withEnabledBlockingInitialNavigation(), withComponentInputBinding()),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
  ],
};
