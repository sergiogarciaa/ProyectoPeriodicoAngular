import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/shared/interfaces/categoria';
import { Noticias } from 'src/app/shared/interfaces/noticias';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import { CategoriasService } from 'src/app/shared/servicios/categorias.service';
import { NoticiasService } from 'src/app/shared/servicios/noticias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-categoria',
  templateUrl: './ver-categoria.component.html',
  styleUrls: ['./ver-categoria.component.css']
})
export class VerCategoriaComponent implements OnInit {
  noticiasPorCategoria: Noticias[] = [];
  private routeSubscription: Subscription | undefined;
  categorias: Categoria[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriasService, 
    private baseDatos: BaseDatosService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();

    this.routeSubscription = this.route.params.subscribe(params => {
      const categoriaId = params['id']; // Suponiendo que recibes el ID de la categoría en la ruta
      this.obtenerNombreCategoria(categoriaId);
    });
  }

  obtenerCategorias() {
    this.baseDatos
      .obtenerTodos('categorias')
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }

  obtenerNombreCategoria(categoriaId: string): void {
    this.categoriaService.obtenerPorId('categorias', categoriaId).subscribe(
      (categoria: Categoria | undefined) => {
        if (categoria) {
          this.categoriaService.obtenerNoticiasPorCategoria(categoria.tipo).subscribe(
            (noticias: Noticias[]) => {
              this.noticiasPorCategoria = noticias;
              console.log(this.noticiasPorCategoria)
              if(!noticias.length){
                this.router.navigate(['/principal/dashboard']);
                Swal.fire('¡Esa categoría está vacía!', 'No se encontró ninguna noticia en esta categoría', 'info');
              }
            },
            error => {
              console.error('Error al obtener las noticias por categoría:', error);
              Swal.fire('Error!', 'Error al obtener las noticias por categoría', 'error');
              this.router.navigate(['/principal/dashboard']);
            }
          );
        }
         else {
          console.error('No se encontró la categoría con el ID proporcionado:', categoriaId);
          Swal.fire('Error!', 'No se encontró la categoría con el ID proporcionado', 'error');
          this.router.navigate(['/principal/dashboard']);
        }
      },
      error => {
        console.error('Error al obtener la categoría:', error);
        Swal.fire('Error!', 'Error al obtener la categoría', 'error');
        this.router.navigate(['/principal/dashboard']);
      }
    );
  }
  logOut(){
    this.auth.logout();
  }
}
