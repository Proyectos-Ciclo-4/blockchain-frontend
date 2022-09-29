import { SweetalertService } from './../../../shared/services/sweetalert.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-application-managment',
  templateUrl: './application-managment.component.html',
  styleUrls: ['./application-managment.component.css'],
})
export class ApplicationManagmentComponent implements OnInit {
  title: string = 'Create Application';
  bodyRegister: any;
  dsecription: string = '';
  uuid: string = uuidv4();
  application!: any;
  user!:User;
  currentApp!:any;

  saludar:any;
  constructor(
    private applicationService$: ApplicationService,
    private auth$: AuthService,
    private swal$ : SweetalertService
  ) {
    this.saludar  = function name() {
      console.log("hola")
    }
  }

  ngOnInit(): void {
    this.user = this.auth$.getUser()!;
    this.listApps();
    this.applicationService$.appModified.subscribe(event => {
      event.valueOf()  == true ? this.listApps() : false;
    });
  }

  register() {
    Swal.fire({
      title: this.title,
      html: `<span class="text-start">Name:</span><div class="row d-flex justify-content-center mx-5">
      <input type="text" class="mb-2 border border-secondary rounded-2" id="app-name" placeholder="App name">
      <span>Description:</span><input type="text" id="description" class="py-3 border border-secondary rounded-2" placeholder="Description"></div>`,
      confirmButtonColor: 'rgb(12 40 73)',
      preConfirm: () => {
        const appName = document.getElementById('app-name') as HTMLInputElement;
        const description = document.getElementById(
          'description'
        ) as HTMLInputElement;
        if (!appName.value || !description.value) {
          Swal.showValidationMessage(`Please enter complete information`);
        }
        return {
          applicationId: this.uuid,
          nameApplication: appName.value,
          description: description.value,
          isActive: 'true',
          userId: this.auth$.getUser()?.uid,
        };
      },
    }).then((result) => {
      this.bodyRegister = result.value;
      this.applicationService$
        .registerApp(this.bodyRegister)
        .subscribe((data) => {
          this.listApps();
        });
    });
  }

  listApps() {
    this.applicationService$
      .getAllApplicationsByUserId(this.auth$.getUser()!.uid)
      .subscribe((app) => {
        this.application = app;
        this.application = this.application.filter(
          (appActive: any) => appActive.active !== false
        );
      });
  }

  showApp(idApp:string ) {
    this.currentApp = this.application.filter(
      (appActive: any) => appActive.applicationID == idApp
    )[0];
    
  }
}
