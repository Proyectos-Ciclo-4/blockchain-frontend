import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateBody } from 'src/app/application/pages/interfaces/models';
import { ApplicationService } from 'src/app/application/services/application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() application!: any;
  formApplication!: FormGroup;

  constructor(
    private application$: ApplicationService
  ) { }

  ngOnInit(): void {
    
  }


  createFormLogin(): FormGroup<any> {
    return new FormGroup({
      appName: new FormControl('', [Validators.required]),
      appDescription: new FormControl('', [Validators.required]),
    });
  }

  deleteApp(idApp : string): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta operación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.application$.deleteApp({"applicationID": idApp }).subscribe((result) => {
          Swal.fire(
            'Deleted!',
            'Tu aplicacion ha sido eliminada.',
            'success'
          )
        });
      }
    })  
    
  }


  editApplication(idApp : string){

    console.log(idApp);


    const ob = {
      applicationID: idApp,
      nameApplication: this.formApplication.value.appName,
      description: this.formApplication.value.appDescription
    } as UpdateBody

    console.log(ob);

    // this.application$.updateApp(ob).subscribe(result => {
    //   Swal.fire(
    //     'Updated!',
    //     'Tu aplicacion ha sido Editada.',
    //     'success'
    //   )
    // });

  }




}
