export interface Usuario {
    id?: string;
    email: string;
    password?: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    rol?: string;
    fechaRegistro?: Date;
}
