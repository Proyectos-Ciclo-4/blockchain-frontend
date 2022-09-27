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
      title: 'Login Form',
      html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
      <input type="password" id="password" class="swal2-input" placeholder="Password">`,
      confirmButtonText: 'Sign in',
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup()?.querySelector('#login')
        console.log(login);
        
        const password = Swal.getPopup()?.querySelector('#password')
        if (!login || !password) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
        return { login: login, password: password }
      }
    }).then((result) => {
      const input = document.getElementById('login') as HTMLInputElement;
      if (input != null) {
        console.log(input.value); // 👉️ "Initial Value"
      }
      /* Swal.fire(`        
        Login: ${result.value}
        Password: ${result.value}
      `.trim()) */
    })
    
  }
}
