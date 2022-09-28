import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-application-managment',
  templateUrl: './application-managment.component.html',
  styleUrls: ['./application-managment.component.css'],
})
export class ApplicationManagmentComponent implements OnInit {
  title: string = 'Create Application';
  bodyRegister: any;
  dsecription: string = '';

  constructor(private applicationService$: ApplicationService) {}

  ngOnInit(): void {}

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
          applicationId: 'LUUUUU',
          nameApplication: appName.value,
          description: description.value,
          isActive: 'true',
          userId: 'userId2210',
        };
      },
    }).then((result) => {
      this.bodyRegister = result.value;
      console.log(this.bodyRegister);
      this.applicationService$
        .registerApp(this.bodyRegister)
        .subscribe((data) => console.log(data));
    });
  }
}
