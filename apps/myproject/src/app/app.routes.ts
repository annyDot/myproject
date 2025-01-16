import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { UsersComponent } from './features/users/users.component';
import { canActivateAuthRole } from './shared/guards/auth-role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'realm-admin' },
  },
  { path: '**', component: HomeComponent },
];
