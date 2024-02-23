import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth.service';

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
    console.log("e" + this.formularioLogin.value.email)
    console.log("e" + this.formularioLogin.value.password)
    this.authService.login(this.formularioLogin.value)
    .then(() => {
      this.router.navigate(['/principal/dashboard']);
    })
    .catch(() => {
      alert("No se ha encontrado la cuenta o la contraseña es incorrecta")
    })
  }
  
  logInWithGoogle(){
    this.authService.logWithGoogleProvider()
  }
}
