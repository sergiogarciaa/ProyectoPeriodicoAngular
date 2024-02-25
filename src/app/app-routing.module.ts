import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'principal/login', pathMatch: 'full'},
  {path: 'principal', loadChildren: () => import('./componentes/principal/principal.module').then(m => m.principalModule) },
  {path: 'administracion', loadChildren: () => import('./componentes/administracion/administrar.module').then(m => m.AdministrarModule) },
  {path: 'periodista', loadChildren: () => import('./componentes/periodista/periodista.module').then(m => m.PeriodistaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
