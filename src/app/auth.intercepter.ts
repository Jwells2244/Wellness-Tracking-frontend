import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🛡️ AuthInterceptor Triggered');

    const skipAuthUrls = [
      '/login',
      '/register',
      '/api/2fa/generate',
      '/api/2fa/verify',
      '/api/2fa/verify-login',
      '/api/users/set-totp-secret'
    ];

    const shouldSkip = skipAuthUrls.some(url => req.url.includes(url));

    if (shouldSkip) {
      console.log('🔓 Skipping token for endpoint:', req.url);
      return next.handle(req);
    }

    const token = localStorage.getItem('authToken');
    console.log('📦 Token in Local Storage:', token);

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('✅ Authorization header added:', cloned.headers.get('Authorization'));
      return next.handle(cloned);
    }

    console.warn('⚠️ No token found, sending request without Authorization header');
    return next.handle(req);
  }
}
