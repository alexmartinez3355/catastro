import { UsuarioModel } from './usuarios.model';
import { TramiteModel } from './tramites.model';
import { HorarioModel } from './horarios.model';
export class CitaModel {
    folioCita?: number;
    fecha?: string;
    tramite?: TramiteModel;
    estado?: string;
    hora?: HorarioModel;
    solicitante?: UsuarioModel;

    constructor(id?: number, fecha?: string, tramite?: TramiteModel, estado?: string, horario?: HorarioModel, solicitante?: UsuarioModel){
        this.folioCita = id;
        this.fecha = fecha;
        this.tramite = tramite;
        this.estado = estado;
        this.hora = horario;
        this.solicitante = solicitante;
    }

    static instanciarCita(obj: CitaModel): any {
        return new CitaModel(
            obj.folioCita,
            obj.fecha,
            TramiteModel.instanciarTramite(obj.tramite),
            obj.estado,
            HorarioModel.instanciarHorarios(obj.hora),
            UsuarioModel.instanciaUsuario(obj.solicitante)
        );
    }

    /* Setters */
    set setIdCita(id: number){
        this.folioCita = id;
    }

    set setFecha(fecha: string){
        this.fecha = fecha;
    }

    set setTramite(tramite: TramiteModel){
        this.tramite = tramite;
    }

    set setEstado(estado: string){
        this.estado = estado;
    }

    set setHorario(hora: HorarioModel){
        this.hora = hora;
    }

    set setSolicitante(solicitante: UsuarioModel){
        this.solicitante = solicitante;
    }

    /* Getters */
    get getIdCita(): number{
        return this.folioCita;
    }

    get getFecha(): string{
        return this.fecha;
    }

    get getTramite(): TramiteModel{
        return this.tramite;
    }

    get getEstado(): string{
        return this.estado;
    }

    get getHora(): HorarioModel{
        return this.hora;
    }

    get getSolicitante(): UsuarioModel{
        return this.solicitante;
    }
}
