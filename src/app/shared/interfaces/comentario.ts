import { Usuario } from "./usuario";

export interface Comentario {
    id?: string;
    contenido: string;
    autor: Usuario;
    fechaPublicacion: Date;
}
