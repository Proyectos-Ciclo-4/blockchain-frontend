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
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.auth$.login(this.formLogin.value)
    .then((res) =>
      this.swal$
      .succesMessage(`Welcome ${res.user.email!}`)
      .then(() => this.router.navigate(['/my-apps']))
    )
    .catch((err) => {
      this.swal$.errorMessage(err.code);
      console.log(err);
    });
  }

  resetPassword() {
    this.swal$.resetPassword();
  }

}
