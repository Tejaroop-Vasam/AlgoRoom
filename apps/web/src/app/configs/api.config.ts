import { Provider } from '@angular/core';
import { API_BASE_URL } from '../services/api/api-client';

export const API_BASE_URL_PROVIDER: Provider = {
  provide: API_BASE_URL,
  useValue: 'http://localhost:3000',
};

export { API_BASE_URL };
