import { Injectable, NgZone } from '@angular/core';
import { Auth, GoogleAuthProvider, sendPasswordResetEmail } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BaseDatosService } from './base-datos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor( 
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private baseDatosServicio: BaseDatosService,
    private firestore: AngularFirestore,
    private ngZone: NgZone,
    private auth: Auth
    ) {
      this.firebaseAuthenticationService.authState.subscribe((user) => {
        if(user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
        }else{
          localStorage.setItem('user', 'null');
        }
      })
   }
   logWithEmailAndPassword(email: string, password: string){
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      this.userData = userCredential.user
      this.observeUserState()
    })
    .catch((error) => {
      alert(error.message);
    })
   }
   logWithGoogleProvider(){
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
    .then(() => this.observeUserState())
    .catch((error: Error) => {
      alert(error.message);
    })
   }
   
    //Metodos para el registro de usuarios en la base de datos y la autenticación
    signUpWithEmailAndPassword(email: string, password: string, nombre: string, apellidos: string, telefono: string){
      return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        if (userCredential && userCredential.user) { // Verificamos que userCredential.user no sea nulo
          // Seteamos los datos del usuario
          const userData: Usuario = {
            id: userCredential.user.uid,
            email: email,
            nombre: nombre,
            apellidos: apellidos,
            telefono: telefono,
            rol: 'usuario',
            fechaRegistro: new Date()
          };
          // Guardamos los datos del usuario en la base de datos
          return this.firestore.collection('usuarios').doc(userCredential.user.uid).set(userData);
        } else {
          throw new Error('Error al obtener datos de usuario después del registro.');
        }
      })
      .then(() => {
        // Mira si está logueado y sino redirige a la página de inicio
        this.observeUserState();
      })
      .catch((error) => {
        alert(error.message);
      })
    }
    observeUserState(){
      return this.firebaseAuthenticationService.authState.subscribe((userState) => {
        userState && this.ngZone.run(() => this.router.navigate(['dashboard']))
      })
    }
    get isLoggedIn(): boolean{
      const user = JSON.parse(localStorage.getItem('user')!);
      return user !== null;
    }
    logOut(){
      return this.firebaseAuthenticationService.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    }
    obtenerUsuarioActual(){
      return this.auth.currentUser;
    }
    guardarUsuarioEnLocalStorage(){

      localStorage.clear();
      const userEmail = this.obtenerUsuarioActual()?.email;
      let usuario: Usuario;
  
      this.baseDatosServicio.obtenerPorFiltro("usuarios", "email", userEmail).subscribe(
        (data: Usuario[]) => {
          if(data.length > 0) {
            usuario = data[0];
            console.log('Usuario encontrado:', usuario);
            localStorage.setItem('usuarioActual', JSON.stringify(usuario));
          }
        }
      )
    }
    obtenerUsuarioDeLocalStorage(){
      const usuarioActual = localStorage.getItem('usuarioActual');
      console.log('Usuario actual:', usuarioActual);
      return usuarioActual ? JSON.parse(usuarioActual) : null;
    }
  
    actualizarUsuarioEnLocalStorage(usuario: Usuario){
      localStorage.setItem('usuarioActual', JSON.stringify(usuario)); 
    }
    eliminarUsuarioDeLocalStorage(){
      localStorage.removeItem('usuarioActual');
      localStorage.clear();
    }
  
    actualizarUsuario(usuario: Usuario){
      return this.baseDatosServicio.actualizar('usuarios', usuario); 
    }
  
    enviarCorreoRestablecimiento(email: string): Promise<void> {
      return sendPasswordResetEmail(this.auth, email);
    }
}