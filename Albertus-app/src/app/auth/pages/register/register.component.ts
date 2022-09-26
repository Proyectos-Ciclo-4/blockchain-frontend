import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(
    private auth$: AuthService,
    private swal$: SweetalertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formRegister = this.createFormRegister();
  }
  createFormRegister(): FormGroup<any> {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  registerUser(){
    this.auth$.register(this.formRegister.value)
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

}
