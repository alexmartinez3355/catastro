export class HorarioModel {
    idHorario?: string;
    horario?: string;

    constructor(id?: string, horario?: string){
        this.idHorario = id;
        this.horario = horario;
    }

    static instanciarHorarios(obj: HorarioModel): any{
        return new HorarioModel(
            obj.idHorario,
            obj.horario
        );
    }

    /* Setters */
    set setIdHorario(id: string){
        this.idHorario = id;
    }

    set setHorario(hora: string){
        this.horario = hora;
    }

    /* Getters */
    get getIdHorario(): string{
        return this.idHorario;
    }

    get getHorario(): string{
        return this.horario;
    }
}
