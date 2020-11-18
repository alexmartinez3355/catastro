import { UsuarioModel } from './../models/usuarios.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  userLogin: UsuarioModel;

  rolUsuario = '';

  url = 'http://localhost/catastro-backend/login';

  constructor(private http: HttpClient, private router: Router) {
    this.userLogin = new UsuarioModel();
  }

  asignarRolUsuario(rol: string): void{
    this.rolUsuario = rol;
    this.setSesionStorage(this.rolUsuario, 'rol_usuario');
  }

  setLocalStorage(datos: any, variable: string): void {
    localStorage.setItem(variable, JSON.stringify(datos));
  }

  getLocalStorage(key: string): string{
    return localStorage.getItem(key);
  }

  setSesionStorage(datos: any, variable: string): void {
    sessionStorage.setItem(variable, JSON.stringify(datos));
  }

  getSessionStorage(key: string): string{
    return sessionStorage.getItem(key);
  }

  login(usuario: UsuarioModel): any{
    return this.http.post(`${this.url}/inicio-sesion.php`, JSON.stringify(usuario));
  }

  logout(): void{
    sessionStorage.clear();
    localStorage.clear();
  }

  sigin(usuario: UsuarioModel): any{
    return this.http.post(`${this.url}/registrar-usuarios.php`, JSON.stringify(usuario));
  }

  setUserLogin(user: UsuarioModel): void{
    this.userLogin = user;
  }

  validarAccesoCliente(): void{
    if (this.router.isActive('solicitar-cita', true)
        || this.router.isActive('consultar-cita', true)
        || this.router.isActive('cancelar-cita', true)) {
      if (this.userLogin.rol !== 'cliente') {
        this.router.navigateByUrl('restringido');
      }
    }
  }

  validarAccesoAdmin(): void {
    if (this.router.isActive('citas', true)) {
      if (this.userLogin.rol !== 'admin') {
        this.router.navigateByUrl('restringido');
      }
    }
  }
}
