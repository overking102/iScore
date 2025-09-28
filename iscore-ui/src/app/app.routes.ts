import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home'
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';
import { IscoreService } from './services/iscore';
import { UserProfile } from './pages/user-profile/user-profile'

export const routes: Routes = [
{
  path: 'login',
  component: Login
},
{
  path:'register',
  component: Register

  },
{
  path: 'home',
  component: Home,
  canActivate: [authGuard]

  },
{
  path: 'user-profile',
  component: UserProfile,
  canActivate: [authGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

{ path: '**', redirectTo: '/login' }




  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

