export class DepartamentoModel {
    idDepartamento?: string;
    nombreDepartamento?: string;

    constructor(idDepartamento?: string, nombreDepto?: string){
        this.idDepartamento = idDepartamento;
        this.nombreDepartamento = nombreDepto;
    }

    static instanciarDepto(obj: DepartamentoModel): any{
        return new DepartamentoModel(
            obj.idDepartamento,
            obj.nombreDepartamento
        );
    }

    /* Setters */
    set setIdDepartamento(id: string) {
        this.idDepartamento = id;
    }

    set setNombreDepto(nombre: string){
        this.nombreDepartamento = nombre;
    }

    /* Getters */
    get getIdDepto(): string{
        return this.idDepartamento;
    }

    get getNombreDepto(): string{
        return this.nombreDepartamento;
    }
}
