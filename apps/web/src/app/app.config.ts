import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { API_BASE_URL_PROVIDER, provideMonaco } from './configs';
import { authInterceptor } from './interceptors/auth.interceptor';
import { apiErrorInterceptor, loadingInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor, apiErrorInterceptor, authInterceptor])),
    provideMonaco(),
    API_BASE_URL_PROVIDER,
  ],
};
