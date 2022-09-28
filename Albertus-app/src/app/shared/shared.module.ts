import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ModalComponent,    
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [NavbarComponent, FooterComponent, ModalComponent],
})
export class SharedModule {}
