import { UsuarioModel } from './../models/usuarios.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultarCitaService {

  url = 'http://localhost/catastro-backend/clientes/';

  constructor(private http: HttpClient) { }

  getListaCitas(usuario: UsuarioModel): any {
    return this.http.post(`${this.url}consultar-citas-cliente.php`, JSON.stringify(usuario));
  }

  descargarPDF(folio): any {
    //let headers = new HttpHeaders().append("Authorization", "Bearer ");
    return this.http.post(`${this.url}imprimir-pdf.php`, JSON.stringify(folio) , {responseType: 'arraybuffer'/*,headers:headers*/});
  }
}
