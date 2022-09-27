import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-managment',
  templateUrl: './application-managment.component.html',
  styleUrls: ['./application-managment.component.css'],
})
export class ApplicationManagmentComponent implements OnInit {
  title: string = 'Create Application';
  inputValue: string = '';

  constructor() {}

  ngOnInit(): void {}

  register() {
    Swal.fire({
      title: this.title,
      confirmButtonColor: 'rgb(12 40 73)',
      html: '<strong>Name:</strong><div class="row d-flex justify-content-center mx-5"><input id="name-app" class="mb-3" type="text"/><input class="" type="text"></div>',
      didOpen: () => {
        const inputValue = Swal.getPopup()?.querySelector('#name-app');
        console.log(inputValue);
      },
    }).then(() => {
      console.log(this.inputValue);
    });
  }
}
