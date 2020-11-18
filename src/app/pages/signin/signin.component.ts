import { GeneralService } from './../../services/general.service';
import { ValidatorsService } from './../../services/validators.service';
import { UsuarioModel } from './../../models/usuarios.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  registro: FormGroup;

  usuarioSigin: UsuarioModel;

  fecha: Date;

  constructor(private fb: FormBuilder,
              private validadores: ValidatorsService,
              private generalService: GeneralService,
              private router: Router) {
    this.usuarioSigin = new UsuarioModel();
    this.createForm();
  }

  ngOnInit(): void {
  }

  sigin(): void {
    if (this.registro.invalid) {
      return Object.values(this.registro.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
    this.usuarioSigin.nombre = this.registro.get('nombre').value;
    this.usuarioSigin.apellidoPaterno = this.registro.get('aPaterno').value;
    this.usuarioSigin.apellidoMaterno = this.registro.get('aMaterno').value;
    this.usuarioSigin.email = this.registro.get('email').value;
    this.usuarioSigin.pass = this.registro.get('pass').value;
    this.usuarioSigin.telefono = this.registro.get('telefono').value;
    this.usuarioSigin.fechaAlta = this.obtenerFechaActual();
    this.generalService.sigin(this.usuarioSigin).subscribe(datos => {
      if (datos === 'OK') {
        this.usuarioRegistrado(this.usuarioSigin);
        this.router.navigateByUrl('login');
        this.registro.reset();
      }
    });
  }

  get nombreNoValido(): boolean {
    return this.registro.get('nombre').invalid && this.registro.get('nombre').touched;
  }

  get nombreValido(): boolean {
    return this.registro.get('nombre').valid && this.registro.get('nombre').touched;
  }

  get aPaternoNoValido(): boolean {
    return this.registro.get('aPaterno').invalid && this.registro.get('aPaterno').touched;
  }

  get aPaternoValido(): boolean {
    return this.registro.get('aPaterno').valid && this.registro.get('aPaterno').touched;
  }

  get aMaternoNoValido(): boolean {
    return this.registro.get('aMaterno').invalid && this.registro.get('aMaterno').touched;
  }

  get aMaternoValido(): boolean {
    return this.registro.get('aMaterno').valid && this.registro.get('aMaterno').touched;
  }

  get telefonoNoValido(): boolean {
    return this.registro.get('telefono').invalid && this.registro.get('telefono').touched;
  }

  get telefonoValido(): boolean {
    return this.registro.get('telefono').valid && this.registro.get('telefono').touched;
  }

  get emailNoValido(): boolean {
    return this.registro.get('email').invalid && this.registro.get('email').touched;
  }

  get emailValido(): boolean {
    return this.registro.get('email').valid && this.registro.get('email').touched;
  }

  get passNoValido(): boolean {
    return this.registro.get('pass').invalid && this.registro.get('pass').touched;
  }

  get passValido(): boolean {
    return this.registro.get('pass').valid && this.registro.get('pass').touched;
  }

  get pass2NoValido(): boolean {
    return this.registro.get('pass2').invalid && this.registro.get('pass2').touched;
  }

  get pass2Valido(): boolean {
    return this.registro.get('pass2').valid && this.registro.get('pass2').touched;
  }

  createForm(): void {
    this.registro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      aPaterno: ['', [Validators.required, Validators.minLength(2)]],
      aMaterno: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      pass2: ['', [Validators.required, Validators.minLength(8)]]
    },
      {
        validators: this.validadores.passwordsIguales('pass', 'pass2')
      });
  }

  obtenerFechaActual(): string {
    this.fecha = new Date();
    const arregloMeses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const day = this.fecha.getDate();
    const month = arregloMeses[this.fecha.getMonth()];
    const year = this.fecha.getFullYear();
    let toDay: string;

    let limite = 0;
    const reiniciar = 1;

    /* Validar mes de febrero */
    if (month === '02') {
      /* Validar años biciesto */
      if (year % 4 === 0) {
        if (year % 100 !== 0) {
          limite = 29;
        }
        else {
          if (year % 400 === 0) {
            limite = 29;
          }
          else {
            limite = 28;
          }
        }
      }
      else {
        limite = 28;
      }
    }
    /* Validar los dias de los meses restantes */
    else if (month === '01' || month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12') {
      limite = 31;
    }
    else if (month === '04' || month === '06' || month === '09' || month === '11') {
      limite = 30;
    }

    /* Validar fecha de hoy */
    toDay = year + '-' + month + '-' + this.formaterDay(day.valueOf().toString());

    return toDay;
  }

  /* Valida que los días siempre tengan dos digitos (En caso de ser 1-9 se concatena un 0 antes del número) */
  formaterDay(day: string): string {
    let dia = '';

    if (day.valueOf().length === 1) {
      dia = '0' + day;
      return dia;
    }
    else {
      return day;
    }
  }

  usuarioRegistrado(usuario: UsuarioModel): void {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: `Usuario: ${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno} ha sido registrado correctamente. Ya puedes iniciar sesión`
    });
  }
}
