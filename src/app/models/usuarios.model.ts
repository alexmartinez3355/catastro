export class UsuarioModel {
    idUsuario?: number;
    nombre?: string;
    aPaterno?: string;
    aMaterno?: string;
    email?: string;
    pass?: string;
    telefono?: string;
    fechaAlta?: string;

    constructor(){
        this.idUsuario = null;
        this.nombre = null;
        this.aPaterno = null;
        this.aMaterno = null;
        this.email = null;
        this.pass = null;
        this.telefono = null;
        this.fechaAlta = null;
    }
}