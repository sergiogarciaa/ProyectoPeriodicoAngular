import { Injectable, NgZone } from '@angular/core';
import { Auth, GoogleAuthProvider, sendPasswordResetEmail, deleteUser, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BaseDatosService } from './base-datos.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private baseDatosServicio: BaseDatosService, private router: Router) { }

  registrar(usuario: Usuario){
    return createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password!);
  }

  async login(usuario: Usuario){
    return signInWithEmailAndPassword(this.auth, usuario.email, usuario.password!);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/principal/login'])
    Swal.fire('¡Se ha cerrado su sesión!', '', 'success' )
    return signOut(this.auth);
  }

  obtenerUsuarioActual(){
    return this.auth.currentUser;
  }

  obtenerUsuarioFirebase(email: string){
    return this.baseDatosServicio.obtenerPorFiltro("usuarios", "email", email);
  }

  async borrarUsuario(usuario: Usuario){
    try {
      const response = await this.login(usuario);
      const user = response.user; 
      if (user) {
        await deleteUser(user); 
        console.log("Usuario eliminado correctamente de Auth firebase.");
      }
    } catch (error) {
      console.error("Error al eliminar usuario de de Auth firebase:", error);
    }
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