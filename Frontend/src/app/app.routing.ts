import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UserGuard } from './services/user.guard';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [
  {path: '', component: TimelineComponent, canActivate:[UserGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: UserEditComponent, canActivate:[UserGuard]},
  {path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
  {path: 'profile/:id', component: ProfileComponent, canActivate:[UserGuard]},
  {path: 'admin', component: AdminComponent, canActivate:[UserGuard]},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
