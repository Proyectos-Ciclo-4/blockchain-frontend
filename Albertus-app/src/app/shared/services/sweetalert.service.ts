import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor(private authService:AuthService) {}

  succesMessage(message = 'Your work has been saved') {
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  errorMessage(message = 'Something went wrong!') {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      footer: 'Why do I have this issue?',
    });
  }

  resetPassword(){
    Swal.fire({
      title: 'Recuperar contraseña',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {        
        return this.authService.resetPassword(email)
          .then(response => {
           console.log(response)
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.succesMessage("Se envió la contraseña satisfactoriamente ")
      }
    })
  }

  hola(){
    console.log("Hola")
  }

  showDetailsApp( funcion: any ){

    Swal.fire({
      html: `
      <div class="row d-flex justify-content-center mx-5">
        <input type="text" class="mb-2 text-center border border-0 fs-2" id="app-name" placeholder="Test">
        <span class="text-start">Token: <br> 123456</span>
        <span class="text-start my-1">Descripción: <br> 
          <textarea class="form-control border border-0 my-1" id="exampleFormControlTextarea1" rows="2" placeholder="safasdfdas"></textarea>
        </span>
        <div class="d-flex flex-row  mx-5">
          <span class="text-start me-5">Creada: <br> 23-28-29</span>
          <span class="text-start">Modificada: <br> 23-28-29</span>
        </div>
        <div class="d-flex flex-row mx-5 justify-content-around mt-4">
          <button class="btn btn-danger" type="button" onClick=' ${funcion}'>Eliminar</button>
          <button class="btn btn-primary" type="button">Editar</button>
          <a href= "/my-apps/report/4dcc4d88-05b5-46e8-b184-4894181d3da1" class="btn btn-info">Reporte</a>
        </div>
      </div>`,
      showConfirmButton: false,
    })
  }
}
