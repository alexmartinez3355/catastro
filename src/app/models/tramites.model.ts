import { DepartamentoModel } from './departamentos.model';
export class TramiteModel {
    idTramite?: string;
    nombreTramite?: string;
    departamento?: DepartamentoModel;

    constructor(){
        this.idTramite = null;
        this.nombreTramite = null;
        this.departamento = new DepartamentoModel();
    }
}