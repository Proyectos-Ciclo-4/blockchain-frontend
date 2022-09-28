import { LoginComponent } from './auth/pages/login/login.component';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    // TODO: proteccion de rutas
  },
  {
    path: 'my-apps',
    loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule),
    // TODO: proteccion de rutas
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // TODO: proteccion de rutas
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
