import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-managment',
  templateUrl: './application-managment.component.html',
  styleUrls: ['./application-managment.component.css'],
})
export class ApplicationManagmentComponent implements OnInit {
  title: string = 'Create Application';
  appName: string = '';
  dsecription: string = '';

  constructor() {}

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
        return { appName: appName.value, description: description.value };
      },
    }).then((result) => {
      this.appName = result.value!.appName;
      this.dsecription = result.value!.description;
    });
  }
}
