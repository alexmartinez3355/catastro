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
    this.usuario.email = this.inicioSesion.get('email').value;
    this.usuario.pass = this.inicioSesion.get('pass').value;
    this.generalService.login(this.usuario).subscribe((datos: UsuarioModel) => {
      if (Object.keys(datos).length >= 1) {
        this.usuarioEncontrado(datos);
        this.generalService.setSesionStorage(datos, 'usuario_activo');
        this.generalService.setUserLogin(datos);
        this.generalService.asignarRolUsuario(datos.rol);
        this.router.navigateByUrl('inicio');
      }
      else{
        this.usuarioNoEncontrado();
      }
    });
  }

  crearFormulario(): void {
    this.inicioSesion = this.fb.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    });
  }

  usuarioEncontrado(usuario: UsuarioModel): void{
    Swal.fire({
      icon: 'success',
      title: 'Bien venido',
      text: `${usuario.nombre}`
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
