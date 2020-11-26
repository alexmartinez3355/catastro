export class UsuarioModel {

    idUsuario: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    pass: string;
    telefono: string;
    fechaAlta: string;
    estado: string;
    rol: string;

    constructor(idUsuario?: number, nombre?: string, apellidoPaterno?: string, apellidoMaterno?: string,
                email?: string, pass?: string, telefono?: string,
                fechaAlta?: string, estado?: string, rol?: string){
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.email = email;
        this.pass = pass;
        this.telefono = telefono;
        this.fechaAlta = fechaAlta;
        this.estado = estado;
        this.rol = rol;
    }
    static instanciaUsuario(obj: UsuarioModel): any{
        return new UsuarioModel(
            obj.idUsuario,
            obj.nombre,
            obj.apellidoPaterno,
            obj.apellidoMaterno,
            obj.email,
            obj.pass,
            obj.telefono,
            obj.fechaAlta,
            obj.estado,
            obj.rol
        );
    }

    /* Setters */
    set setIdUsuario(id: number){
        this.idUsuario = id;
    }

    set setNombre(nombre: string){
        this.nombre = nombre;
    }

    set setApellidoPaterno(apellidoPaterno: string) {
        this.apellidoPaterno = apellidoPaterno;
    }

    set setApellidoMaterno(apellidoMaterno: string){
        this.apellidoMaterno = apellidoMaterno;
    }

    set setEmail(email: string){
        this.email = email;
    }

    set setPass(pass: string){
        this.pass = pass;
    }

    set setTelefono(telefono: string){
        this.telefono = telefono;
    }

    set setFechaAlta(fechaAlta: string){
        this.fechaAlta = fechaAlta;
    }

    set setEstado(estado: string){
        this.estado = estado;
    }

    set setRol(rol: string){
        this.rol = rol;
    }

    /* Getters */
    get getId(): number {
        return this.idUsuario;
    }

    get getNombre(): string{
        return this.nombre;
    }

    get getApellidoPaterno(): string{
        return this.apellidoPaterno;
    }

    get getApellidoMaterno(): string{
        return this.apellidoMaterno;
    }

    get getEmail(): string {
        return this.email;
    }

    get getPass(): string{
        return this.pass;
    }

    get getTelefno(): string{
        return this.telefono;
    }

    get getFechaAlta(): string{
        return this.fechaAlta;
    }

    get getEstado(): string{
        return this.estado;
    }

    get getRol(): string{
        return this.rol;
    }

    /* Gertters especiales*/
    get nombreCompleto(): string {
        return `${this.nombre} ${this.apellidoPaterno} ${this.apellidoMaterno}`;
    }


}
