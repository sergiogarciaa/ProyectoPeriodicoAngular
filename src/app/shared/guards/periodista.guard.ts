import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { BaseDatosService } from '../servicios/base-datos.service';
import { first } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';

export const periodistaGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const AuthServicio = inject(AuthService);
  const router = inject(Router);
  const baseDatos = inject(BaseDatosService);

  try {
    const usuarioActual = await AuthServicio.obtenerUsuarioActual();
    console.log('Usuario actual en Firestore:', usuarioActual);
    
    if (!usuarioActual) {
      console.log('No hay usuario actual en Firestore');
      // Si no hay usuario actual, redirige al usuario al inicio de sesión
      router.navigate(['/principal/login']);
      return false;
    } else {
      const usuarioFirestore = await baseDatos.obtenerPorFiltro('usuarios', 'email', usuarioActual.email).pipe(first()).toPromise() as Usuario[];
      console.log('Usuario encontrado en Firestore:', usuarioFirestore);
      
      if (usuarioFirestore.length > 0 && usuarioFirestore[0].rol === 'Periodista' || usuarioFirestore[0].rol === 'Admin') {
        // Si el usuario actual tiene rol periodista o administrador, permite el acceso.
        console.log('Acceso permitido');
        return true;
      } else {
        // Si el usuario actual no tiene rol periodista o administrador o no se encontró en Firestore, redirige al usuario al inicio de sesión.
        console.log('Acceso denegado');
        router.navigate(['/principal/dashboard']);
        return false;
      }
    }
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    return false;
  }
};
