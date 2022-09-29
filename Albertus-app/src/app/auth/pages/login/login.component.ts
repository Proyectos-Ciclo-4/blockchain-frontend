import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(
    private auth$: AuthService,
    private swal$: SweetalertService,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.formLogin = this.createFormLogin();
  }

  createFormLogin(): FormGroup<any> {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }


  login() {
    this.auth$.login(this.formLogin.value)
    .then((res) =>{
      this.auth$.sessionActive.emit(true);
      this.swal$
      .succesMessage(`Bienvenido ${res.user.email!}`)
      .then(() => this.router.navigate(['/my-apps']))
    })
    .catch((err) => {
      switch (err.code) {
        case "auth/user-not-found":
          this.swal$.errorMessage("El usuario no existe");
          break;
        case "auth/wrong-password":
          this.swal$.errorMessage("La Contraseña es incorrecta");
          break;
        default:
          break;
      }
      
      console.log(err.code);
    });
  }

  resetPassword() {
    this.swal$.resetPassword();
  }

}
