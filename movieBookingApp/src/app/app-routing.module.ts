import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotUsernameComponent } from './forgot-username/forgot-username.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full' 
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "login", component: LoginComponent
  },
  { 
    path: 'admin-dashboard', component: AdminDashboardComponent 
  },
  { 
    path: 'user-dashboard', component: UserDashboardComponent 
  },
  { 
    path: 'forgot-password', component: ForgotPasswordComponent 
  },
  { 
    path: 'forgot-username', component: ForgotUsernameComponent 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
