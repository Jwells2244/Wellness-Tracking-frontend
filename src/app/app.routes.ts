import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PhysicalWellbeingComponent } from './physical-wellbeing/physical-wellbeing.component';
import { EntriesFormComponent } from './entries-form/entries-form.component';
import { WellbeingListComponent } from './wellbeing-list/wellbeing-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'physical-wellbeing', component: PhysicalWellbeingComponent },
  { path: 'entries-form', component: EntriesFormComponent, canActivate: [AuthGuard] },
  { path: 'wellbeing-list', component: WellbeingListComponent, canActivate: [AuthGuard] }
];
