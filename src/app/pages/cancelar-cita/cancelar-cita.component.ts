import { CancelarCitaService } from './../../services/cancelar-cita.service';
import { Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cancelar-cita',
  templateUrl: './cancelar-cita.component.html',
  styleUrls: ['./cancelar-cita.component.css']
})
export class CancelarCitaComponent implements OnInit {

  cancelar: FormGroup;

  cita = {
    folio: ''
  };

  constructor(
              private generalService: GeneralService,
              private router: Router,
              private fb: FormBuilder,
              private cancelarCitaService: CancelarCitaService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.generalService.validarAccesoCliente();
  }

  crearFormulario(): void {
    this.cancelar = this.fb.group({
      folio: ['', Validators.required]
    });
  }

  cancelarCita(): void {
    this.cita.folio = this.cancelar.get('folio').value;
    console.log('Folio: ', this.cita);
    this.cancelarCitaService.cancelarCita(this.cita).subscribe(datos => {
      if (datos === 'OK') {
        Swal.fire({
          icon: 'success',
          text: 'Cita cancelada con exito.'
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          text: 'Error al cancelar, intentalo mas tarde.'
        });
      }
    });
  }

  verificarCancelacion(): void {
    if (this.cancelar.invalid){
      return Object.values(this.cancelar.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    Swal.fire({
      title: '¿Seguro que quieres cancelar esta cita?',
      icon: 'warning',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Si, cancelar`,
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isDenied) {
        this.cancelarCita();
        this.cancelar.reset();
      }
    });
  }

  get folioNoValido(): boolean {
    return this.cancelar.get('folio').invalid && this.cancelar.get('folio').touched;
  }
}
