import { UsuarioModel } from './../../models/usuarios.model';
import { CitaModel } from './../../models/citas.model';
import { ConsultarCitaService } from './../../services/consultar-cita.service';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consultar-cita',
  templateUrl: './consultar-cita.component.html',
  styleUrls: ['./consultar-cita.component.css']
})
export class ConsultarCitaComponent implements OnInit {

  descargar = faDownload;

  listaCitas: CitaModel[] = [];
  usuario: UsuarioModel;

  constructor(private generalService: GeneralService, private consultarCitaService: ConsultarCitaService) { }

  ngOnInit(): void {
    this.generalService.validarAccesoCliente();
    this.usuario = JSON.parse(this.generalService.getSessionStorage('usuario_activo'));
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.consultarCitaService.getListaCitas(this.usuario).subscribe((datos: CitaModel[]) => {
      if (Object.keys(datos).length >= 1) {
        this.listaCitas = datos;
      }
    });
  }

  descargarPDF(folioCita): void {
    const pdf = {
      id: folioCita
    };
    /* console.log(pdf); */
    this.consultarCitaService.descargarPDF(pdf).subscribe(
      (datos) => {
      /* console.log(datos); */
      this.downLoadFile(datos, 'application/pdf');
    }, (eror) => {
      console.log('Tengo un errror', eror);
    });

  }

  downLoadFile(data: any, type: string): void {
    const blob = new Blob([data], { type: type.toString() });
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

}
