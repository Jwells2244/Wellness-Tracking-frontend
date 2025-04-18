import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PhysicalWellbeingComponent } from './physical-wellbeing/physical-wellbeing.component';
import { EntriesFormComponent } from './entries-form/entries-form.component';
import { WellbeingListComponent } from './wellbeing-list/wellbeing-list.component';
import { AuthGuard } from './auth.guard';
<<<<<<< HEAD
import { VisualizerComponent } from './visualizer/visualizer.component';
import { ProfileComponent } from './profile/profile.component';
=======
import { ActivityDashboardComponent } from './activity-dashboard/activity-dashboard.component';
>>>>>>> 5a5e10ad2fb040e43af1f70c612ddbc4c6774e11

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
<<<<<<< HEAD
  { path: 'physical-wellbeing', component: PhysicalWellbeingComponent },
  { path: 'entries-form', component: EntriesFormComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}

=======
  { path: 'activity-dashboard', component: ActivityDashboardComponent, canActivate: [AuthGuard] },
  { path: 'entries-form', component: EntriesFormComponent, canActivate: [AuthGuard] },
  { path: 'wellbeing-list', component: WellbeingListComponent, canActivate: [AuthGuard] }
>>>>>>> 5a5e10ad2fb040e43af1f70c612ddbc4c6774e11
];
