import { Component } from '@angular/core';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  emailUsuarioActual: string | undefined | null;
  usuarioActual: Usuario | undefined;
  
  constructor(private authService: AuthService, private baseDatosServicio: BaseDatosService) {
    localStorage.clear();
  }
  
  ngOnInit(): void {

    this.emailUsuarioActual = this.authService.obtenerUsuarioActual()?.email;
  
    if (!this.usuarioActual) {
      console.log("Desde la bd")
      // Si el usuario no se ha obtenido desde el Local Storage, intenta obtenerlo de la base de datos.
      this.baseDatosServicio
        .obtenerPorFiltro('usuarios', 'email', this.emailUsuarioActual)
        .subscribe((data) => {
          this.usuarioActual = data[0];
        });
    }
  }
}
