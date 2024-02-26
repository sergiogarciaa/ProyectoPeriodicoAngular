import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/shared/interfaces/comentario';
import { Noticias } from 'src/app/shared/interfaces/noticias';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import { ComentariosService } from 'src/app/shared/servicios/comentarios.service';
import { NoticiasService } from 'src/app/shared/servicios/noticias.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-ver-noticia',
  templateUrl: './ver-noticia.component.html',
  styleUrls: ['./ver-noticia.component.css']
})
export class VerNoticiaComponent {
  noticia: Noticias | undefined;
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  usuario: any;
  idUsuario: any;
  usuarioRol: any;

  constructor(
    private route: ActivatedRoute,
    private comentarioService: ComentariosService,
    private auth: AuthService,
    private noticiasService: NoticiasService,
    private baseDatos: BaseDatosService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    this.usuario = params['usuarioNombre'];
    this.idUsuario = params['usuarioId'];
    this.usuarioRol = params['usuarioRol'];
    });
    this.route.params.subscribe(params => {
      const id = params['id']; // Obtener el ID de la noticia de la URL
      this.noticiasService.obtenerNoticiaPorId(id).subscribe(noticia => {
        this.noticia = noticia;
        // Llamar a obtenerComentarios después de obtener la noticia
        this.obtenerComentarios();
      });
    });
}

borrarComentario(comentarioId: string) {
  this.baseDatos.eliminar('comentarios', comentarioId)
    .then(() => {
      Swal.fire('¡Éxito!', 'Comentario eliminado con éxito', 'success');
      this.obtenerComentarios(); // Actualiza la lista de comentarios después de eliminar uno
    })
    .catch(error => {
      Swal.fire('¡Error!', 'Error al eliminar el comentario', 'error');
      console.error('Error al eliminar el comentario:', error);
    });
}

  obtenerComentarios() {
    if (this.noticia && this.noticia.id) {
      this.comentarioService.obtenerComentariosPorNoticia(this.noticia.id).subscribe(
        (comentarios: Comentario[]) => {
          this.comentarios = comentarios;
          console.log(comentarios)
        },
        (error: any) => {
          Swal.fire('¡Error!', 'Error al obtener los comentarios:', 'error' )
          console.error('Error al obtener los comentarios:', error);
        }
      );
    } else {
      Swal.fire('¡Error!', 'No se ha encontrado la noticia', 'error' )
      console.error('El ID de la noticia es undefined');
    }
  }

  private convertirTimestampADate(timestamp: any): Date {
    if (timestamp instanceof Date) {
      return timestamp; // Si ya es un objeto Date, devolverlo tal cual
    } else if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate(); // Si es un objeto Timestamp, convertirlo a Date
    } else if (timestamp && typeof timestamp.seconds === 'number') {
      return new Date(timestamp.seconds * 1000); // Si es un objeto con la propiedad 'seconds', asumir que es un objeto Timestamp y convertirlo a Date
    } else {
      return new Date(); // Si no se puede convertir, devolver la fecha actual como fallback
    }
  }

  agregarComentario() {
    const idComentario = uuidv4();
    if (this.nuevoComentario.trim() !== '') {
        const nuevoComentario: Comentario = {
          id: idComentario,
          contenido: this.nuevoComentario,
          autor: this.usuario,
          idUsuario: this.idUsuario,
          fechaPublicacion: this.convertirTimestampADate(new Date()),
          idNoticia: this.noticia?.id // Asocia el ID de la noticia al comentario
        };
  
        this.comentarioService.agregarComentario(nuevoComentario).subscribe(
          () => {
            // Limpiar el campo de texto después de agregar el comentario
            this.nuevoComentario = '';
            // Volver a cargar los comentarios para mostrar el nuevo comentario
            Swal.fire('¡Éxito!', 'Comentario agregado con éxito', 'success' )
            this.obtenerComentarios();
          },
          (error: any) => {
            Swal.fire('¡Error!', 'Error al agregar el comentario', 'error' )
            console.error('Error al agregar el comentario:', error);
          }
        );
    } else {
      Swal.fire('¡Comentario vacío!', 'No puede estar vacío', 'info' )
      console.error('El comentario está vacío.');
    }
  }
  logOut(){
    this.auth.logout();
  }
}
