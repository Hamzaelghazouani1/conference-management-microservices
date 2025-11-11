import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { AuthService } from '../services/auth';

/**
 * Authentication Interceptor
 * Adds JWT token to outgoing requests
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  // Skip if not authenticated
  if (!authService.isAuthenticated()) {
    return next(req);
  }

  // Update token if needed and add to request
  return from(authService.updateToken(30)).pipe(
    switchMap(() => {
      const token = authService.getToken();
      
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(authReq);
      }
      
      return next(req);
    })
  );
};

