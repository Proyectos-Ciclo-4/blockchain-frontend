import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationManagmentComponent } from './pages/applicationManagment/application-managment.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ApplicationManagmentComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
