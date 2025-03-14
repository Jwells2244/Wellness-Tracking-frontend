// src/app/app.routes.ts
import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { PhysicalWellbeingComponent } from './physical-wellbeing/physical-wellbeing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // {path: 'physical-wellbeing', component: PhysicalWellbeingComponent}
];
