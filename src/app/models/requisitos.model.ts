export class RequisitoModel {
    idRequisito?: number;
    descripcion?: string;

    constructor(id?: number, descricion?: string){
        this.idRequisito = id;
        this.descripcion = descricion;
    }

    static instanciarRequisito(obj: RequisitoModel): RequisitoModel{
        return new RequisitoModel(
            obj.idRequisito,
            obj.descripcion
        );
    }
}
