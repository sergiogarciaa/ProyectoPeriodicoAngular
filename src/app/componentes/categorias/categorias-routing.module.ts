import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { VerCategoriaComponent } from './ver-categoria/ver-categoria.component';



const routes: Routes = [
  {
    path: '', component: CategoriasComponent,
    children: [
      { path: 'ver-categoria/:id', component: VerCategoriaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule { }
