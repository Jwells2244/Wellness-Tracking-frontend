import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Standalone component
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import {routes} from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)) // Add router configurations
  ]
}).catch(err => console.error(err));
