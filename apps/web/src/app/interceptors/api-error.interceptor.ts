import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../shared/components/toast/toast.service';

interface BackendErrorPayload {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

function showToastForError(
  status: number,
  body: BackendErrorPayload | null | undefined,
  statusText: string,
  toast: ToastService,
): void {
  let title = 'Error';
  let message = 'An unexpected error occurred.';

  if (Array.isArray(body?.message)) {
    message = body.message.join('. ');
  } else if (typeof body?.message === 'string' && body.message.trim()) {
    message = body.message;
  } else if (typeof body?.error === 'string' && body.error.trim()) {
    message = body.error;
  } else if (statusText) {
    message = statusText;
  }

  switch (status) {
    case 0:
      title = 'Network Error';
      message = 'Unable to reach the server. Please check your connection.';
      break;
    case 400:
      title = (typeof body?.error === 'string' && body.error) || 'Bad Request';
      break;
    case 401:
      title = 'Unauthorized';
      message = (typeof body?.message === 'string' && body.message) || 'Please log in to continue.';
      break;
    case 403:
      title = 'Access Denied';
      message = (typeof body?.message === 'string' && body.message) || 'You do not have permission to perform this action.';
      break;
    case 404:
      title = 'Not Found';
      message = (typeof body?.message === 'string' && body.message) || 'The requested resource was not found.';
      break;
    case 409:
      title = 'Conflict';
      message = (typeof body?.message === 'string' && body.message) || 'A conflict occurred with the current state.';
      break;
    case 422:
      title = 'Validation Error';
      break;
    case 429:
      title = 'Too Many Requests';
      message = (typeof body?.message === 'string' && body.message) || 'Rate limit exceeded. Please wait a moment before retrying.';
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      title = 'Server Error';
      message = (typeof body?.message === 'string' && body.message) || 'The server encountered an error. Please try again later.';
      break;
    default:
      title = status > 0 ? `Error (${status})` : 'Error';
      break;
  }

  toast.error(message, { title });
}

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof Blob) {
          error.error.text().then(text => {
            let parsed: BackendErrorPayload | null = null;
            try {
              parsed = JSON.parse(text);
            } catch {
              parsed = null;
            }
            showToastForError(error.status, parsed, error.statusText, toast);
          }).catch(() => {
            showToastForError(error.status, null, error.statusText, toast);
          });
        } else {
          showToastForError(
            error.status,
            typeof error.error === 'object' ? (error.error as BackendErrorPayload) : null,
            error.statusText,
            toast,
          );
        }
      }

      return throwError(() => error);
    }),
  );
};
