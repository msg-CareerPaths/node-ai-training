import { InjectionToken } from '@angular/core';

export interface EnvironmentConfiguration {
  production: boolean;
  apiUrl: string;
  wsUrl: string;
}

export const EnvironmentConfig = new InjectionToken<EnvironmentConfiguration>(
  'API_ENDPOINT_CONFIG',
);
