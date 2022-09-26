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
  ) {    
    
  }

  ngOnInit(): void {
    this.formRegister = this.createFormRegister();
  }

  createFormRegister(): FormGroup<any> {
    return new FormGroup({
      email: new FormControl('name', [Validators.required, Validators.email]),
      password: new FormControl('password', [Validators.required]),
    });
  }
  
  register(){
    
  }

  resetPassword() {
    this.swal$.resetPassword();
  }

}
