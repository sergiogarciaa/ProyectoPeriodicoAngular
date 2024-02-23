import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAdmin()) {
    return true; // Permitir acceso si el usuario tiene el rol de administrador
  } else {
    // Redirigir a una página de acceso no autorizado si el usuario no tiene permisos
    router.navigate(['/principal/dashboard']);
    return false;
  }
};
