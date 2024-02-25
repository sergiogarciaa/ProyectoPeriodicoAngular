import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Noticias } from 'src/app/shared/interfaces/noticias';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-noticias',
  templateUrl: './administrar-noticias.component.html',
  styleUrls: ['./administrar-noticias.component.css']
})
export class AdministrarNoticiasComponent {
  noticias: Noticias[] = [];
  emailUsuarioActual: string | undefined | null;
  usuarioActual: Usuario | undefined;
  
  constructor(
    private auth: AuthService,
    private baseDatos: BaseDatosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emailUsuarioActual = this.auth.obtenerUsuarioActual()?.email;
  
    if (!this.usuarioActual) {
      console.log("Desde la bd")
      // Si el usuario no se ha obtenido desde el Local Storage, intenta obtenerlo de la base de datos.
      this.baseDatos
        .obtenerPorFiltro('usuarios', 'email', this.emailUsuarioActual)
        .subscribe((data) => {
          this.usuarioActual = data[0];
        });
    }

    this.obtenerNoticias();
  }
  


  obtenerNoticias() {
    this.baseDatos
      .obtenerTodos('noticias')
      .subscribe((noticias: Noticias[]) => {
        this.noticias = noticias;
      });
  }

  eliminarNoticia(id: string) {
    this.baseDatos
      .eliminar('noticias', id)
      .then(() => {
        this.noticias = this.noticias.filter(noticia => noticia.id !== id);
        Swal.fire('Noticia eliminada', '', 'success');
      })
      .catch((error) => {
        console.error("Error al eliminar la noticia:", error);
        Swal.fire('Error', 'Ocurrió un error al eliminar la noticia', 'error');
      });
  }

  logOut() {
    this.auth.logout();
  }
}
