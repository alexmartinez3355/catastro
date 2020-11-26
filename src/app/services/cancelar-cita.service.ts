import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CancelarCitaService {

  url = 'http://localhost/catastro-backend/clientes/';

  constructor(private http: HttpClient) { }

  cancelarCita(folio): any{
    return this.http.post(`${this.url}cancelar-cita-cliente.php`, JSON.stringify(folio));
  }
}
