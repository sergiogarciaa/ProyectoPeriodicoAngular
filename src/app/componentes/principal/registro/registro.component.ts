import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { BaseDatosService } from 'src/app/shared/servicios/base-datos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  formularioRegistro: FormGroup;

  constructor(private authService: AuthService, private router: Router, private baseDatos: BaseDatosService) {
    this.formularioRegistro = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
    });
  }

  signUp() {
    this.authService.registrar(this.formularioRegistro.value)
    .then((response) => {
      console.log(response);
      this.insertarUserEnFirebase();
    })
      .catch((error) => {
        console.error("Error durante el registro:", error.message);
      });
  }
  insertarUserEnFirebase() {
    const usuario: Usuario = {
      nombre: this.formularioRegistro.value.nombre,
      apellidos: this.formularioRegistro.value.apellidos,
      email: this.formularioRegistro.value.email,
      telefono: this.formularioRegistro.value.telefono, 
      rol: 'Usuario',
      fechaRegistro: new Date(),
    };
    this.baseDatos
      .insertar('usuarios', usuario)
      .then(() => {
        this.router.navigate(['/principal/login']);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
