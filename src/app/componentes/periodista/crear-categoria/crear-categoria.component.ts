import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/shared/interfaces/categoria';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import Swal from 'sweetalert2';
// Genera un ID aleatorio para asignar
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent {
  formularioCategoria: FormGroup;

  constructor(private baseDatos: BaseDatosService, private router: Router, private auth: AuthService) {
    this.formularioCategoria = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  crearCategoria() {
    if (this.formularioCategoria.valid) {
      // Asignar id Aleatorio
      const idCategoria = uuidv4();
      const nuevaCategoria: Categoria = {
        id: idCategoria,
        descripcion: this.formularioCategoria.value.descripcion,
        tipo: this.formularioCategoria.value.tipo
      };

      this.baseDatos.insertar('categorias', nuevaCategoria)
        .then(() => {
          this.router.navigate(['/periodista/administrar-categorias']);
          Swal.fire('Categoría creada', '', 'success');
        })
        .catch((error: any) => {
          console.error("Error al crear la categoría:", error);
          Swal.fire('Error', 'Ocurrió un error al crear la categoría', 'error');
        });
    } else {
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
    }
  }

  logOut(){
    this.auth.logout();
  }
}
