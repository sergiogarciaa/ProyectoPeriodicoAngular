import { Injectable } from '@angular/core';
import { BaseDatosService } from './base-datos.service';
import { Noticias } from '../interfaces/noticias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private baseDatosServicio: BaseDatosService) { }

  crearNoticia(nuevaNoticia: Noticias) {
    return this.baseDatosServicio.insertar('noticias', nuevaNoticia);
  }
}
