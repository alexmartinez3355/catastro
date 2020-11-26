import { DepartamentoModel } from './departamentos.model';
export class TramiteModel {
    idTramite?: string;
    nombreTramite?: string;
    departamento?: DepartamentoModel;

    constructor(id?: string, nombre?: string, departamento?: DepartamentoModel){
        this.idTramite = id;
        this.nombreTramite = nombre;
        this.departamento = departamento;
    }

    static instanciarTramite(obj: TramiteModel): any{
        return new TramiteModel(
            obj.idTramite,
            obj.nombreTramite,
            obj.departamento
        );
    }

    /* Setters */
    set setIdTramite(id: string){
        this.idTramite = id;
    }

    set setNombreTramite(nombre: string){
        this.nombreTramite = nombre;
    }

    set setDepartamento(departamento: DepartamentoModel){
        this.departamento = departamento;
    }

    /* Getters */
    get getIdTramite(): string {
        return this.idTramite;
    }

    get getNombreTramite(): string{
        return this.nombreTramite;
    }

    get getDepartamento(): DepartamentoModel{
        return this.departamento;
    }
}
