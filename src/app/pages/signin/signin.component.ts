import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  registro: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  sigin(): void{
    if (this.registro.invalid) {
      return Object.values(this.registro.controls).forEach( control => {
        control.markAllAsTouched();
      });
    }
    console.log(this.registro);
  }

  get nombreNoValido(): boolean {
    return this.registro.get('nombre').invalid && this.registro.get('nombre').touched;
  }

  get aPaternoNoValido(): boolean {
    return this.registro.get('aPaterno').invalid && this.registro.get('aPaterno').touched;
  }

  get aMaternoNoValido(): boolean {
    return this.registro.get('aMaterno').invalid && this.registro.get('aMaterno').touched;
  }

  get telefonoNoValido(): boolean {
    return this.registro.get('telefono').invalid && this.registro.get('telefono').touched;
  }

  get correoNoValido(): boolean {
    return this.registro.get('correo').invalid && this.registro.get('correo').touched;
  }

  get passNoValido(): boolean {
    return this.registro.get('pass').invalid && this.registro.get('pass').touched;
  }


  createForm(): void{
    this.registro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      aPaterno: ['', [Validators.required, Validators.minLength(5)]],
      aMaterno: ['', [Validators.required, Validators.minLength(5)]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(5), this.validatedPassword]],
      pass2: []
    });
  }

  validatedPassword(control: AbstractControl){

    const pass1 = control.get('pass');
    const pass2 = control.get('pass2');
    let error = null;

    if (pass1 === pass2) {
      return error;
    }
    else{
      error = {...error, noCompatible: 'Las contraseñas no coinciden'};
    }
  }
}
