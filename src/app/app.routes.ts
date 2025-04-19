import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PhysicalWellbeingComponent } from './physical-wellbeing/physical-wellbeing.component';
import { EntriesFormComponent } from './entries-form/entries-form.component';
import { WellbeingListComponent } from './wellbeing-list/wellbeing-list.component';
import { AuthGuard } from './auth.guard';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { ProfileComponent } from './profile/profile.component';
import { ActivityDashboardComponent } from './activity-dashboard/activity-dashboard.component';
import { TwoFactorChoiceComponent } from './signup/two-fa-choice/two-fa-choice.component';
import { TwoFaSetupComponent } from './signup/two-fa-setup/two-fa-setup.component';
import { TwoFaLoginComponent } from './login/two-fa-login/two-fa-login.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'physical-wellbeing', component: PhysicalWellbeingComponent },
  { path: 'entries-form', component: EntriesFormComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '2fa-choice', component: TwoFactorChoiceComponent },
  { path: '2fa-setup', component: TwoFaSetupComponent },
  { path: '2fa-login', component: TwoFaLoginComponent },
  { path: 'activity-dashboard', component: ActivityDashboardComponent, canActivate: [AuthGuard] },
  { path: 'entries-form', component: EntriesFormComponent, canActivate: [AuthGuard] },
  { path: 'wellbeing-list', component: WellbeingListComponent, canActivate: [AuthGuard] }
];
