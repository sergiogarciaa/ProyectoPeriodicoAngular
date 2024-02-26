import { Component } from '@angular/core';
import { Categoria } from 'src/app/shared/interfaces/categoria';
import { Noticias } from 'src/app/shared/interfaces/noticias';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import { CategoriasService } from 'src/app/shared/servicios/categorias.service';
import { NoticiasService } from 'src/app/shared/servicios/noticias.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  // Obtener usuario actual
  emailUsuarioActual: string | undefined | null;
  usuarioActual: Usuario | undefined;
  // Obtener categorias
  categorias: Categoria[] = [];
  // Obtener noticias
  noticiasRecientes: Noticias[] = [];
  
  constructor(private authService: AuthService, 
    private baseDatos: BaseDatosService, 
    private categoriasService: CategoriasService,
    private noticiaServicio: NoticiasService
    ) {
    localStorage.clear();
  }
  
  ngOnInit(): void {
    this.obtenerNoticiasRecientes();
    // Obtener categorias
    this.obtenerCategorias();
    // Obtener usuario actual
    this.emailUsuarioActual = this.authService.obtenerUsuarioActual()?.email;
  
    if (!this.usuarioActual) {
      console.log("Desde la bd")
      // Si el usuario no se ha obtenido desde el Local Storage, intenta obtenerlo de la base de datos.
      this.baseDatos
        .obtenerPorFiltro('usuarios', 'email', this.emailUsuarioActual)
        .subscribe((data) => {
          this.usuarioActual = data[0];
        });
    }
  }

  obtenerNoticiasRecientes(): void {
    this.noticiaServicio.obtenerNoticias().subscribe(
      noticias => {
        // Ordenar las noticias por ID de manera descendente
        noticias.sort((a, b) => (a.id! < b.id!) ? 1 : -1);
        // Seleccionar las primeras 4 noticias
        this.noticiasRecientes = noticias.slice(0, 4);
      },
      error => {
        console.error('Error al obtener las noticias:', error);
      }
    );
  }

  obtenerCategorias() {
    this.baseDatos
      .obtenerTodos('categorias')
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }

  logOut(){
    this.authService.logout();
  }
}
