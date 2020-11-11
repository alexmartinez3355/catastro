import { UsuarioModel } from './../models/usuarios.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  url = 'http://localhost/catastro-backend/login';

  rolUsuario = 0;

  userLogin: UsuarioModel;

  constructor(private http: HttpClient) {
    this.userLogin = new UsuarioModel();
  }

  asignarRolUsuario(rol: number): void{
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

  getSesionStorage(key: string): string{
    return sessionStorage.getItem(key);
  }

  login(usuario: UsuarioModel): any{
    return this.http.post(`${this.url}/inicio-sesion.php`, JSON.stringify(usuario));
  }

  logout(): void{
    this.asignarRolUsuario(0);
    sessionStorage.clear();
    localStorage.clear();
  }

  sigin(usuario: UsuarioModel): any{
    return this.http.post(`${this.url}/registrar-usuarios.php`, JSON.stringify(usuario));
  }

  setUserLogin(): void{
    this.userLogin = JSON.parse(this.getLocalStorage('usuario_logueado'));
  }
}
