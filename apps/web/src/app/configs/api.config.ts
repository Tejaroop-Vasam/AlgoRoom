import { Provider } from '@angular/core';
import { API_BASE_URL } from '../services/api/api-client';
import { environment } from '../../environments/environment';

export const API_BASE_URL_PROVIDER: Provider = {
  provide: API_BASE_URL,
  useValue: environment.apiUrl,
};

export { API_BASE_URL };
