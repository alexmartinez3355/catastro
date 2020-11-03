import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
