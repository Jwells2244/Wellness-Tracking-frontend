import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Standalone component
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/auth.intercepter'; // adjust the path if needed

bootstrapApplication(AppComponent, {
  ...appConfig, 
  providers: [
    ...appConfig.providers, 
    importProvidersFrom(RouterModule.forRoot(routes)),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
}).catch(err => console.error(err));