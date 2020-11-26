import { UsuarioModel } from './../../models/usuarios.model';
import { GeneralService } from './../../services/general.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { faUserCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faUserCircle = faUserCircle;
  faLock = faLock;

  inicioSesion: FormGroup;

  usuario: UsuarioModel;

  constructor(private generalService: GeneralService, private router: Router, private fb: FormBuilder) { 
    this.usuario = new UsuarioModel();
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.inicioSesion.invalid) {
      return Object.values(this.inicioSesion.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
    this.usuario.setEmail = this.inicioSesion.get('email').value;
    this.usuario.setPass = this.inicioSesion.get('pass').value;
    this.generalService.login(this.usuario).subscribe((datos: UsuarioModel) => {
      if (datos.getId !== undefined) {
        this.usuario = UsuarioModel.instanciaUsuario(datos);
        this.generalService.setSessionStorage(this.usuario, 'usuario_activo');
        this.generalService.setUserLogin(this.usuario);
        this.router.navigateByUrl('inicio');
        this.usuarioEncontrado(this.usuario);
      }
      else {
        this.usuarioNoEncontrado();
        this.inicioSesion.reset();
      }
    });
  }

  crearFormulario(): void {
    this.inicioSesion = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass: ['', [Validators.required]]
    });
  }

  get emailObligatorio(): boolean {
    return this.inicioSesion.get('email').invalid && this.inicioSesion.get('email').touched;
  }
  get emailValido(): boolean {
    return this.inicioSesion.get('email').valid && this.inicioSesion.get('email').touched;
  }

  get passObligatorio(): boolean {
    return this.inicioSesion.get('pass').invalid && this.inicioSesion.get('pass').touched;
  }
  get passValido(): boolean {
    return this.inicioSesion.get('pass').valid && this.inicioSesion.get('pass').touched;
  }

  usuarioEncontrado(usuario: UsuarioModel): void{
    Swal.fire({
      icon: 'success',
      title: 'Bienvenido(a)',
      text: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
    });
  }

  usuarioNoEncontrado(): void{
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      text: 'El correo/contraseña son incorrectos'
    });
  }
}
