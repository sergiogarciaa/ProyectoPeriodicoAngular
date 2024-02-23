import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private authService: AuthService) {

  }

  signUp(email: string, password: string) {
    this.authService.signUpWithEmailAndPassword(email, password);
  }
}
