import { Comentario } from "./comentario";

export interface Noticias {
    id?: string;
    titulo : string;
    cuerpo: string;
    comentarios?: Comentario[]; // Noticia puede tener comentarios opcionales
    autor: string[];
}
