import { Usuarios } from './../models/usuarios.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  url = 'http://localhost/proyecto-catastro/login';

  rolUsuario = 0;

  constructor(private http: HttpClient) {
  }

  asignarRolUsuario(rol: number): void{
    this.rolUsuario = rol;
    this.setSesionStorage(this.rolUsuario, 'rol_usuario');
  }

  login(usuario: Usuarios): any{
    return this.http.post(`${this.url}/inicio-sesion.php`, JSON.stringify(usuario));
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

  logout(): void{
    this.asignarRolUsuario(0);
    sessionStorage.clear();
    localStorage.clear();
  }
}
