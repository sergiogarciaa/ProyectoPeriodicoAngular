import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService){

  }
  logIn(email:string, password:string){
    this.authService.logWithEmailAndPassword(email, password)
  }
  logInWithGoogle(){
    this.authService.logWithGoogleProvider()
  }
}
