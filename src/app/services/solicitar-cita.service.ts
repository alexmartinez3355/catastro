import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitarCitaService {

  url = 'http://localhost/catastro-backend/clientes/';

  constructor(private http: HttpClient) { }

  getListaTramites(): any {
    return this.http.get(`${this.url}consultar-tramites.php`);
  }

  getListaHorarios(): any {
    return this.http.get(`${this.url}consultar-horarios.php`);
  }
}
