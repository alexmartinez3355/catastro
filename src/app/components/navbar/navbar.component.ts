import { Router } from '@angular/router';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.verificarLogueo();
  }

  verificarLogueo(): void {
    if (sessionStorage.getItem('rol_usuario')) {
      // tslint:disable-next-line: radix
      this.generalService.asignarRolUsuario(parseInt(sessionStorage.getItem('rol_usuario')));
      this.generalService.setUserLogin();
    }
  }

  logout(): void{
    this.router.navigateByUrl('login');
    this.generalService.logout();
  }
}
