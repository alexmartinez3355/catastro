import { UsuarioModel } from './../../models/usuarios.model';
import { Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { faSignOutAlt,
        faCog,
        faSignInAlt,
        faUserCircle,
        faHome,
        faCalendarCheck,
        faCalendarAlt,
        faTrash,
        faListUl } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  citas = faCalendarAlt;
  solicitarCita = faCalendarCheck;
  consultarCita = faListUl;
  eliminarCita = faTrash;
  inicio = faHome;
  entrar = faUserCircle;
  registrarse = faSignInAlt;
  salir = faSignOutAlt;
  configuracion = faCog;

  usuarioLogin: UsuarioModel;

  constructor(public generalService: GeneralService, private router: Router) {
    this.verificarLogueo();
  }

  ngOnInit(): void {

  }

  verificarLogueo(): void {
    if (sessionStorage.getItem('usuario_activo')) {
      this.usuarioLogin = UsuarioModel.instanciaUsuario(JSON.parse(this.generalService.getSessionStorage('usuario_activo')));
      /* this.usuarioLogin = JSON.parse(this.generalService.getSessionStorage('usuario_activo')); */
      this.generalService.setUserLogin(this.usuarioLogin);
      /* this.generalService.asignarRolUsuario(this.usuarioLogin.rol); */
    }
  }

  logout(): void {
    this.router.navigateByUrl('login');
    this.generalService.logout();
  }
}
