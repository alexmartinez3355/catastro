import { CitaModel } from './../../models/citas.model';
import { HorarioModel } from './../../models/horarios.model';
import { TramiteModel } from './../../models/tramites.model';
import { SolicitarCitaService } from './../../services/solicitar-cita.service';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitar-cita',
  templateUrl: './solicitar-cita.component.html',
  styleUrls: ['./solicitar-cita.component.css']
})
export class SolicitarCitaComponent implements OnInit {

  solicitudCita: FormGroup;

  listaTramites: TramiteModel[] = [];

  listaCitas: CitaModel[] = [];

  listaHorarios: HorarioModel[] = [];

  constructor(private generalService: GeneralService,
              private solicitarCitaService: SolicitarCitaService,
              private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.generalService.validarAccesoCliente();
    this.cargarTramites();
    this.cargarHorarios();
  }

  crearFormulario(): void {
    this.solicitudCita = this.fb.group({
      fecha: ['', Validators.required],
      tramite: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  solicitarCita(): void {
  }

  cargarTramites(): void {
    this.solicitarCitaService.getListaTramites().subscribe((datos: TramiteModel[]) => {
      this.listaTramites = datos;
    });
  }

  cargarHorarios(): void {
    this.solicitarCitaService.getListaHorarios().subscribe((datos: HorarioModel[]) => {
      this.listaHorarios = datos;
    });
  }

  fechaSeleccionada(): void{
    console.log(this.solicitudCita.get('fecha').value);
  }

}
