import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home'
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { authGuard } from './guards/auth-guard';
import { IscoreService } from './services/iscore';


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
  component: Home

  },
{ path: '', redirectTo: '/login', pathMatch: 'full' },

{
        path: '', // This is the URL for your main page, e.g., localhost:4200/home
        component: Home,
        canActivate: [authGuard] // The "bouncer" for this route
    },




  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

