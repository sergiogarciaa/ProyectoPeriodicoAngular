import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseDatosService } from '../shared/servicios/base-datos.service';

@Injectable({
  providedIn: 'root'
})
export class SwalFireService {

  constructor(
    private baseDatos: BaseDatosService,
    private Auth: AuthService,
    private router: Router
  ) { }

   /**
   * Muestra una ventana modal de notificación para el usuario.
   * @param titulo titulo del modal
   * @param mensaje mensaje que se muestra en el cuerpo del modal
   * @param tipo tipo del modal a mostrar
   */
   mostrarNotificacion(titulo: string, mensaje: string, tipo: any) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
    });
  }
}
