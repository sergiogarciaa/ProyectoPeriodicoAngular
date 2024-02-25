import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/shared/interfaces/categoria';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent {
  formularioEditarCategoria: FormGroup;
  categoria: Categoria | undefined;
  idCategoria: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private baseDatosServicio: BaseDatosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.formularioEditarCategoria = this.formBuilder.group({
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.idCategoria = params['id'];
      if (this.idCategoria) {
        this.baseDatosServicio
          .obtenerPorId('categorias', this.idCategoria)
          .subscribe((data: Categoria) => {
            this.categoria = data;
            this.formularioEditarCategoria.setValue({
              descripcion: data.descripcion,
              tipo: data.tipo
            });
          });
      }
    });
  }

  editarCategoria() {
    const categoria: Categoria = {
      id: this.idCategoria,
      descripcion: this.formularioEditarCategoria.value.descripcion,
      tipo: this.formularioEditarCategoria.value.tipo
    };
    this.baseDatosServicio
      .actualizar('categorias', categoria)
      .then(() => {
        this.router.navigate(['/periodista/administrar-categorias']);
        Swal.fire('Editar categoría completado!', 'Se ha editado correctamente la categoría', 'success');
      })
      .catch((error) => {
        console.error("Error al editar la categoría:", error);
        Swal.fire('Error', 'Ocurrió un error al editar la categoría', 'error');
      });
  }

  logOut(){
    this.auth.logout();
  }
}
