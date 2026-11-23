import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../shared/components/toast/toast.service';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const toast = inject(ToastService);

  return next(request).pipe(catchError((error: unknown) => {
    if (error instanceof HttpErrorResponse) {
      const detail = error.error?.detail;
      const message = typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
          ? detail.map(issue => `${issue.loc.slice(1).join('.')}: ${issue.msg}`).join('. ')
          : error.status === 0
            ? 'Unable to reach the server.'
            : 'The server could not complete the request.';
      toast.error(message, { title: error.status ? `Error (${error.status})` : 'Network Error' });
    }
    return throwError(() => error);
  }));
};
