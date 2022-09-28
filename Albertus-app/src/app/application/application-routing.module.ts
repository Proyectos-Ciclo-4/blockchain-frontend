import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationManagmentComponent } from './pages/applicationManagment/application-managment.component';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ApplicationManagmentComponent
      },
      {
        path: 'report/angular',
        component: ReportComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
