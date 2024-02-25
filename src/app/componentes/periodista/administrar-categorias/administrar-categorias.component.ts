import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/shared/interfaces/categoria';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-categorias',
  templateUrl: './administrar-categorias.component.html',
  styleUrls: ['./administrar-categorias.component.css']
})
export class AdministrarCategoriasComponent {
  categorias: Categoria[] = [];
  //Obtener usuario actual para redirigir a crear Noticia
  emailUsuarioActual: string | undefined | null;
  usuarioActual: Usuario | undefined;

  constructor(
    private baseDatos: BaseDatosService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    //Obtener usuario actual para redirigir a crear Noticia
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

    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.baseDatos
      .obtenerTodos('categorias')
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }

  eliminarCategoria(id: string) {
    this.baseDatos
      .eliminar('categorias', id)
      .then(() => {
        this.categorias = this.categorias.filter(categoria => categoria.id !== id);
        Swal.fire('Categoría eliminada', '', 'success');
      })
      .catch((error) => {
        console.error("Error al eliminar la categoría:", error);
        Swal.fire('Error', 'Ocurrió un error al eliminar la categoría', 'error');
      });
  }

  logOut() {
    this.auth.logout();
  }
}
