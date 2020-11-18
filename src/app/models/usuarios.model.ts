export class UsuarioModel {
    idUsuario?: number;
    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    email?: string;
    pass?: string;
    telefono?: string;
    fechaAlta?: string;
    estado: string;
    rol: string;

    constructor(){
        this.idUsuario = null;
        this.nombre = null;
        this.apellidoPaterno = null;
        this.apellidoMaterno = null;
        this.email = null;
        this.pass = null;
        this.telefono = null;
        this.fechaAlta = null;
        this.estado = 'activo';
        this.rol = 'cliente';
    }
}