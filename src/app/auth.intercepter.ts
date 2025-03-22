import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🛡️ AuthInterceptor Triggered'); // ✅ Log interceptor call

    const token = localStorage.getItem('authToken');
    console.log('📦 Token in Local Storage:', token); // ✅ Log the token value

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('✅ Authorization header added:', cloned.headers.get('Authorization')); // ✅ Log header

      return next.handle(cloned);
    }

    console.warn('⚠️ No token found, sending request without Authorization header');
    return next.handle(req);
  }
}
