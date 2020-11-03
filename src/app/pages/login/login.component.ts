import { Usuarios } from './../../models/usuarios.model';
import { GeneralService } from './../../services/general.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { faUserCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { text } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faUserCircle = faUserCircle;
  faLock = faLock;

  usuario: Usuarios = {
  };

  rolUsuario = 1;

  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(): void {
    console.log('Datos usuarios a enviar: ', this.usuario);
    this.generalService.login(this.usuario).subscribe((datos: Usuarios) => {
      if (Object.keys(datos).length >= 1) {
        this.router.navigateByUrl('inicio');
        this.generalService.asignarRolUsuario(this.rolUsuario);
        this.generalService.setLocalStorage(datos, 'usuario_logueado');
        this.usuarioEncontrado(datos);
      }
      else{
        console.log('Usuario no registrado');
        this.usuarioNoEncontrado();
      }
    });
  }

  usuarioEncontrado(usuario: Usuarios): void{
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
