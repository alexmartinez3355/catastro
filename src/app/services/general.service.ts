import { UsuarioModel } from './../models/usuarios.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  userLogin: UsuarioModel;

  url = 'http://localhost/catastro-backend/login';

  constructor(private http: HttpClient, private router: Router) {
    this.userLogin = new UsuarioModel();
  }

  /* Get y Set de LocalStorage */
  setLocalStorage(datos: any, variable: string): void {
    localStorage.setItem(variable, JSON.stringify(datos));
  }

  getLocalStorage(key: string): string{
    return localStorage.getItem(key);
  }

  /* Get y Set de SessionStorage */
  setSessionStorage(datos: any, variable: string): void {
    sessionStorage.setItem(variable, JSON.stringify(datos));
  }

  getSessionStorage(key: string): string{
    return sessionStorage.getItem(key);
  }

  /* Iniciar sesión, Cerrar sesión y Registrarse (en ese orden)  */
  login(usuario: UsuarioModel): any{
    return this.http.post<UsuarioModel>(`${this.url}/inicio-sesion.php`, JSON.stringify(usuario))
            .pipe(
              map(
                respuesta => UsuarioModel.instanciaUsuario(respuesta)
              )
            );
  }

  logout(): void{
    this.userLogin = new UsuarioModel();
    sessionStorage.clear();
    localStorage.clear();
  }

  sigin(usuario: UsuarioModel): any{
    return this.http.post(`${this.url}/registrar-usuarios.php`, JSON.stringify(usuario));
  }

  /* Creación del usuario logueado */
  setUserLogin(user: UsuarioModel): void{
    this.userLogin = UsuarioModel.instanciaUsuario(user);
  }

  /* Validación de acceso a los modulos */
  validarAccesoCliente(): void{
    if (this.router.isActive('solicitar-cita', true)
        || this.router.isActive('consultar-cita', true)
        || this.router.isActive('cancelar-cita', true)) {
          if (this.userLogin === undefined) {
            this.router.navigateByUrl('restringido');
          }
          else {
            if (this.userLogin.rol !== 'cliente') {
              this.router.navigateByUrl('restringido');
            }
          }
    }
  }

  validarAccesoAdmin(): void {
    if (this.router.isActive('citas', true)) {
      if (this.userLogin === undefined) {
        this.router.navigateByUrl('restringido');
      }
      else {
        if (this.userLogin.rol !== 'admin') {
          this.router.navigateByUrl('restringido');
        }
      }
    }
  }
}
