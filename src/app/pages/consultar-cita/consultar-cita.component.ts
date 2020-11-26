import { UsuarioModel } from './../../models/usuarios.model';
import { CitaModel } from './../../models/citas.model';
import { ConsultarCitaService } from './../../services/consultar-cita.service';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consultar-cita',
  templateUrl: './consultar-cita.component.html',
  styleUrls: ['./consultar-cita.component.css']
})
export class ConsultarCitaComponent implements OnInit {

  eliminar = faTrashAlt;

  listaCitas: CitaModel[] = [];
  usuario: UsuarioModel;

  constructor(private generalService: GeneralService, private consultarCitaService: ConsultarCitaService) { }

  ngOnInit(): void {
    this.generalService.validarAccesoCliente();
    this.usuario = JSON.parse(this.generalService.getSessionStorage('usuario_activo'));
    this.cargarCitas();
  }

  cargarCitas(): void{
    this.consultarCitaService.getListaCitas(this.usuario).subscribe((datos: CitaModel[]) => {
      if (Object.keys(datos).length >= 1) {
        this.listaCitas = datos;
      }
    });
  }

}
