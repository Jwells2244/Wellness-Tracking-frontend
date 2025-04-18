import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/auth.intercepter'; // adjust the path if needed

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
<<<<<<< HEAD
    ...appConfig.providers,
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
}).catch(err => console.error(err));
=======
    ...appConfig.providers, 
    importProvidersFrom(RouterModule.forRoot(routes)),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
>>>>>>> 5a5e10ad2fb040e43af1f70c612ddbc4c6774e11
