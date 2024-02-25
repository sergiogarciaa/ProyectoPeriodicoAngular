import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ver-panel',
  templateUrl: './ver-panel.component.html',
  styleUrls: ['./ver-panel.component.css']
})
export class VerPanelComponent {
  usuarios: Usuario[] = [];

  constructor(
    private auth: AuthService,
    private baseDatos: BaseDatosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  
  obtenerUsuarios() {
    this.baseDatos
      .obtenerTodos('usuarios')
      .pipe(
        map((usuarios: Usuario[]) => {
          return usuarios.map((usuario) => ({
            ...usuario,
            fechaRegistro: this.convertirTimestampADate(usuario.fechaRegistro),
          }));
        })
      )
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        console.log(this.usuarios);
      });
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

  eliminar(id: string, email: string) {
    const usuarioAeliminar: Usuario = this.usuarios.find(
      (user) => user.id === id
    )!;

    if(usuarioAeliminar.rol === 'Admin'){
      return;
    }

    this.baseDatos
          .eliminar('usuarios', id)
          .then(() => {
            console.log(`${'usuario'} eliminado`);
            this.auth.borrarUsuario(usuarioAeliminar);
          })
          .catch((error) => {
            console.log(error);
          });
  }
}
