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
    this.formApplication = this.createFormApplication();
  }


  createFormApplication(): FormGroup<any> {
    return new FormGroup({
      appName: new FormControl('', ),
      appDescription: new FormControl('', ),
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
          this.application$.appModified.emit(true);
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
    let name = "";
    let description2 = "";

    name = this.formApplication.value.appName == "" ? this.application.nameApplication
    : this.formApplication.value.appName;

    description2 = this.formApplication.value.appDescription == "" ? this.application.description
    : this.formApplication.value.appDescription;
        
    const ob = {
      applicationID: idApp,
      nameApplication: name,
      description: description2
    } as UpdateBody

    this.application$.updateApp(ob).subscribe(result => {      
      this.application$.appModified.emit(true);
      let timerInterval: any;
      Swal.fire({
        title: 'Modificando...',
        html: 'Efectivo en <b></b> milliseconds.',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
          const b: any  = Swal.getHtmlContainer()!.querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
      
    });

  }

  updateInfo(){
    this.application$.appModified.emit(true);
  }



}
