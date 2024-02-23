import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private authService: AuthService, private router: Router) {

  }

  signUp(email: string, password: string, nombre: string, apellidos: string, telefono: string) {
    this.authService.signUpWithEmailAndPassword(email, password, nombre, apellidos, telefono)
      .then(() => {
        console.log("Registro exitoso");
        this.router.navigate(['../login']);
      })
      .catch((error) => {
        console.error("Error durante el registro:", error.message);
      });
  }
}
