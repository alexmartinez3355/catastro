import { UsuarioModel } from './usuarios.model';
import { TramiteModel } from './tramites.model';
export class CitaModel {
    idCita?: number;
    fecha?: number;
    tramite?: TramiteModel;
    estado?: string;
    hora?: string;
    solicitante?: UsuarioModel;

    constructor(){
        this.idCita = null;
        this.fecha = null;
        this.tramite = new TramiteModel();
        this.estado = null;
        this.hora = null;
        this.solicitante = new UsuarioModel();
    }
}
