import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // <-- This is the correct place to import it

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { routes } from './app.routes';

@NgModule({
declarations: [
AppComponent,
LoginComponent,
SignupComponent,
HomeComponent
],
imports: [
BrowserModule,
HttpClientModule,  // <-- Import HttpClientModule here in AppModule
FormsModule,
RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
