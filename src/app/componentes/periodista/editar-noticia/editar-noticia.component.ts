import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/shared/interfaces/categoria';
import { Noticias } from 'src/app/shared/interfaces/noticias';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import { CategoriasService } from 'src/app/shared/servicios/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent {
  formularioEditarNoticia: FormGroup;
  noticia: Noticias | undefined;
  idNoticia: string | undefined;
  categorias: Categoria[] = [];

  constructor(
    private route: ActivatedRoute,
    private baseDatosServicio: BaseDatosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private categoriasServicio: CategoriasService,
    private auth: AuthService
  ) {
    this.formularioEditarNoticia = this.formBuilder.group({
      titulo: ['', Validators.required],
      cuerpo: ['', Validators.required],
      autor: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();

    this.route.params.subscribe((params) => {
      this.idNoticia = params['id'];
    });
    // Pasar los valores de la noticia que se edita al formulario
    if (this.idNoticia !== undefined) {
      this.baseDatosServicio
        .obtenerPorId('noticias', this.idNoticia)
        .subscribe((data: Noticias) => {
          this.noticia = data;
          this.formularioEditarNoticia.setValue({
            titulo: data.titulo,
            cuerpo: data.cuerpo,
            autor: data.autor,
            categoria: data.categoria,
          });
        });
    }
  }

  obtenerCategorias() {
    this.categoriasServicio.obtenerTodasCategorias().subscribe(
      (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }

  editarNoticia() {
    const noticia: Noticias = {
      id: this.idNoticia,
      titulo: this.formularioEditarNoticia.value.titulo,
      cuerpo: this.formularioEditarNoticia.value.cuerpo,
      autor: this.formularioEditarNoticia.value.autor,
      categoria: this.formularioEditarNoticia.value.categoria
    };
    this.baseDatosServicio
      .actualizar('noticias', noticia)
      .then(() => {
        this.router.navigate(['/periodista/administrar-noticias']);
        Swal.fire('Editar noticia completado!', 'Se ha editado correctamente la noticia', 'success');
      })
      .catch((error) => {
        console.error("Error al editar la noticia:", error);
        Swal.fire('Error', 'Ocurrió un error al editar la noticia', 'error');
      });
  }

  logOut(){
    this.auth.logout();
  }
}
