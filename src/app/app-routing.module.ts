import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'principal/login', pathMatch: 'full'},
  {path: 'principal', loadChildren: () => import('./componentes/principal/principal.module').then(m => m.principalModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
