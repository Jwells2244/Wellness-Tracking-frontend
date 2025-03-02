import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';  // Root component
import { HomeComponent } from './home/home.component';  // Standalone component
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { routes } from './app.routes';  // Import routes configuration

@NgModule({
  declarations: [
    // Declare the main root component
    // HomeComponent is not declared here if it's standalone
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HomeComponent,  // Import standalone components here
    LoginComponent,  // If these are also standalone, import them
    SignupComponent  // Same as above
  ],
  providers: [],
  bootstrap: [] // Bootstrapping the main component
})
export class AppModule { }
