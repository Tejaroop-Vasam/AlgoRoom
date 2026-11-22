import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { API_BASE_URL } from '../services/api/api-client';
import { AuthSessionService } from '../services/auth-session.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const baseUrl = (inject(API_BASE_URL) ?? '').replace(/\/$/, '');
  const session = inject(AuthSessionService);
  const token = session.accessToken();
  if (!token || !baseUrl || !request.url.startsWith(`${baseUrl}/`)) {
    return next(request);
  }

  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401 && session.accessToken() === token) {
        session.end();
      }
      return throwError(() => error);
    }),
  );
};
