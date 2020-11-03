export class Usuarios {
    idUsuario?: number;
    nombre?: string;
    aPaterno?: string;
    aMaterno?: string;
    email?: string;
    pass?: string;

    constructor(){
        this.idUsuario = null;
        this.nombre = null;
        this.aPaterno = null;
        this.aMaterno = null;
        this.email = null;
        this.pass = null;
    }
}