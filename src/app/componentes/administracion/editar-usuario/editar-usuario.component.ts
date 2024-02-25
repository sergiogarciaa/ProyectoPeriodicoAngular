import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  formularioEditarUsuario: FormGroup;
  usuario: Usuario | undefined;
  idUsuario: string | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private baseDatosServicio: BaseDatosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formularioEditarUsuario = this.formBuilder.group({
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idUsuario = params['id'];
    });
    // Pasar los valores del usuario que se edita al formulario
    if (this.idUsuario !== undefined) {
      this.baseDatosServicio
        .obtenerPorId('usuarios', this.idUsuario)
        .subscribe((data: Usuario) => {
          this.usuario = data;
          this.formularioEditarUsuario.setValue({
            email: data.email,
            nombre: data.nombre,
            apellidos: data.apellidos,
            telefono: data.telefono,
            rol: data.rol,
          });
        });
    }
  }
  editarUsuario() {
    const usuario: Usuario = {
      id: this.idUsuario,
      email: this.formularioEditarUsuario.value.email,
      nombre: this.formularioEditarUsuario.value.nombre,
      apellidos: this.formularioEditarUsuario.value.apellidos,
      telefono: this.formularioEditarUsuario.value.telefono,
      rol: this.formularioEditarUsuario.value.rol,
    };
    this.baseDatosServicio.actualizar('usuarios', usuario).then(() => {      
      this.router.navigate(['/administracion/ver-panel']);
      Swal.fire('Editar usuario completado!', 'Se ha editado correctamente al usuario', 'success' )
    });
  }
}
