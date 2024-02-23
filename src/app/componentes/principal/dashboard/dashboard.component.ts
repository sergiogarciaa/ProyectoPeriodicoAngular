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
    this.authService.guardarUsuarioEnLocalStorage();
  }
  
  ngOnInit(): void {

    this.emailUsuarioActual = this.authService.obtenerUsuarioActual()?.email;
    
    this.baseDatosServicio
      .obtenerPorFiltro('usuarios', 'email', this.emailUsuarioActual)
      .subscribe((data) => {
        this.usuarioActual = data[0];
      });
  }


  logOut() {
    this.authService.logOut();
  }
}
