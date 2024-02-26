import { Usuario } from "./usuario";

export interface Comentario {
    id?: string;
    contenido: string;
    autor: string;
    fechaPublicacion: Date;
    idUsuario?: string;
    idNoticia?: string;
}
