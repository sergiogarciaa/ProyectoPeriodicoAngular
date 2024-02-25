import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup;

  constructor(private authService: AuthService, private router: Router){
    this.formularioLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  
  onSubmit() {
    console.log(this.formularioLogin.value.email)
    console.log(this.formularioLogin.value.password)
    this.authService.login(this.formularioLogin.value)
    .then(() => {
      this.router.navigate(['/principal/dashboard']);
      Swal.fire('Login correcto!','Bienvenido a La Revista', 'success')
    })
    .catch(() => {
      Swal.fire('Login fallido!','No se ha encontrado la cuenta o la contraseña es incorrecta', 'error')
    })
  }
  
  
}
