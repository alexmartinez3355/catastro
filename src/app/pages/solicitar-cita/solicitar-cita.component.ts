import { Router } from '@angular/router';
import { RequisitoModel } from './../../models/requisitos.model';
import { DepartamentoModel } from './../../models/departamentos.model';
import { UsuarioModel } from './../../models/usuarios.model';
import { CitaModel } from './../../models/citas.model';
import { HorarioModel } from './../../models/horarios.model';
import { TramiteModel } from './../../models/tramites.model';
import { SolicitarCitaService } from './../../services/solicitar-cita.service';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-cita',
  templateUrl: './solicitar-cita.component.html',
  styleUrls: ['./solicitar-cita.component.css']
})
export class SolicitarCitaComponent implements OnInit {

  solicitud: FormGroup;

  listaTramites: TramiteModel[] = [];
  listaHorarios: HorarioModel[] = [];
  listaCitas: CitaModel[] = [];
  horarios: HorarioModel[] = [];
  listaRequisitos: RequisitoModel[] = [];

  valueTramite: boolean;
  valueHorario: boolean;

  banderaCita = {
    fecha: '',
    depto: ''
  };

  constructor(private generalService: GeneralService, private solicitarCitaService: SolicitarCitaService, private fb: FormBuilder,
    private router: Router) {
    this.crearFormulario();
    this.valueTramite = false;
    this.valueHorario = false;
  }

  ngOnInit(): void {
    this.generalService.validarAccesoCliente();
    this.cargarTramites();
    this.cargarHorarios();
    this.establecerValDefaultTramite();
    this.establecerValDefaultHorario();
    this.fechaSeleccionada();
    this.tramiteSeleccionado();
    this.validandoValoresHorarios();
    this.validandoValoresTramites();
    this.resetearCalendario();
  }

  crearFormulario(): void {
    this.solicitud = this.fb.group({
      fecha: ['', Validators.required],
      tramite: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  solicitarCita(): void {
    if (this.solicitud.invalid) {
      return Object.values(this.solicitud.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const t: TramiteModel[] = this.listaTramites.filter(tramite => tramite.nombreTramite === this.solicitud.get('tramite').value);
    const h: HorarioModel[] = this.horarios.filter(hora => hora.horario === this.solicitud.get('hora').value);
    const usuario: UsuarioModel = JSON.parse(this.generalService.getSessionStorage('usuario_activo'));
    const nuevaCita = {
      fecha: this.solicitud.get('fecha').value,
      estado: 'activa',
      tramite: t[0].idTramite,
      solicitante: usuario.idUsuario,
      hora: h[0].idHorario
    };

    this.solicitarCitaService.solicitarCita(nuevaCita).subscribe(datos => {
      if (datos === 'OK') {
        this.citaGuardada();
        this.router.navigateByUrl('inicio');
      }
      else {
        this.citaNoGuardada();
        console.log('Problemas al guardar');
      }
    });
  }

  /* Carga de Data */
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

  cargarRequisitos(tramite: TramiteModel): void {
    this.solicitarCitaService.getListaRequisitos(tramite).subscribe((datos: RequisitoModel[]) => {
      if (Object.keys(datos).length >= 1) {
        this.listaRequisitos = datos;
      }
    });
  }

  cargarCitas(data): void {
    this.solicitarCitaService.getListaCitasFecha(data).subscribe((datos) => {
      if (Object.keys(datos).length >= 1) {
        for (const i of datos) {
          this.listaHorarios = this.listaHorarios.filter(horario => horario.idHorario !== i.hora);
        }
        this.horarios = this.listaHorarios;
      }
      else {
        this.horarios = this.listaHorarios;
      }
    });
  }

  /* Establecer valores por defecto */
  establecerValDefaultTramite(): void {
    if (this.solicitud.get('tramite').value === '') {
      this.valueTramite = true;
    }
  }

  establecerValDefaultHorario(): void {
    if (this.solicitud.get('hora').value === '') {
      this.valueHorario = true;
    }
  }

  /* Metodos de validación */
  fechaSeleccionada(): void {
    this.solicitud.get('fecha').valueChanges.subscribe(fecha => {
      if (this.solicitud.get('tramite').invalid) {
        return this.solicitud.get('tramite').markAsTouched();
      }
      if (this.solicitud.get('fecha').valid) {
        this.valueHorario = true;
        const t: string = this.solicitud.get('tramite').value;
        const tramiteS = this.listaTramites.filter(tramite => tramite.nombreTramite === t.trim());
        const d: DepartamentoModel = tramiteS[0].departamento;
        this.banderaCita.fecha = this.solicitud.get('fecha').value;
        this.banderaCita.depto = d.idDepartamento;
        this.cargarCitas(this.banderaCita);
      }
      else {
        this.valueHorario = true;
      }
    });
  }

  tramiteSeleccionado(): void {
    this.solicitud.get('tramite').valueChanges.subscribe(dato => {
      this.listaRequisitos = [];
      const t: TramiteModel[] = this.listaTramites.filter(tramite => tramite.nombreTramite === dato);
      this.cargarRequisitos(t[0]);
    });
  }

  validandoValoresHorarios(): void {
    this.solicitud.get('hora').valueChanges.subscribe(hora => {
      this.valueHorario = false;
    });
  }

  validandoValoresTramites(): void {
    this.solicitud.get('tramite').valueChanges.subscribe(tramites => {
      this.valueTramite = false;
    }
    );
  }

  validarHorarioDisponible(): void {

  }

  resetearCalendario(): void {
    this.solicitud.get('tramite').valueChanges.subscribe(v => {
      if (this.solicitud.get('fecha').value !== '') {
        this.solicitud.get('fecha').reset();
      }
    });
  }

  seleccionarDepto(): void {

  }

  /* Validar campos vacios */
  get tramiteNoValido(): boolean {
    return this.solicitud.get('tramite').invalid && this.solicitud.get('tramite').touched;
  }

  get fechaNoValida(): boolean {
    return this.solicitud.get('fecha').invalid && this.solicitud.get('fecha').touched;
  }

  get horaNoValida(): boolean {
    return this.solicitud.get('hora').invalid && this.solicitud.get('hora').touched;
  }

  /* Alerts */
  citaGuardada(): void {
    Swal.fire({
      icon: 'success',
      title: '¡Guardado exitoso!',
      text: `Tu cita ha sido guardada correctamente`
    });
  }

  citaNoGuardada(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error inesperado',
      text: 'Ha ocurrido un error al guardar, intentelo mas tarde'
    });
  }
}
