import { CitaModel } from './../models/citas.model';
import { TramiteModel } from './../models/tramites.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RequisitoModel } from '../models/requisitos.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitarCitaService {

  url = 'http://localhost/catastro-backend/clientes/';

  constructor(private http: HttpClient) { }

  getListaTramites(): any {
    return this.http.get<TramiteModel>(`${this.url}consultar-tramites.php`);
  }

  getListaHorarios(): any {
    return this.http.get(`${this.url}consultar-horarios.php`);
  }

  getListaCitasFecha(fecha: any): any {
    return this.http.post(`${this.url}consultar-citas-fecha.php`, JSON.stringify(fecha));
  }

  getListaRequisitos(tramite: TramiteModel): any {
    return this.http.post(`${this.url}consultar-requisitos.php`, JSON.stringify(tramite));
  }

  solicitarCita(cita): any{
    return this.http.post(`${this.url}guardar-cita.php`, JSON.stringify(cita));
  }
}
