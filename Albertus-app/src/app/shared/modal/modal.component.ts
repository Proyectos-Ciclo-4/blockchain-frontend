import { Component, Input, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/application/services/application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() application!: any;

  constructor(
    private application$: ApplicationService
  ) { }

  ngOnInit(): void {
    
  }

  deleteApp(idApp : string): void {/* 
    debugger
    console.log(idApp);
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta operación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
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
    }) */
    
  }

}
