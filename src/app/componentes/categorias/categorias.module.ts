import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerCategoriaComponent } from './ver-categoria/ver-categoria.component';
import { CategoriasComponent } from './categorias.component';
import { CategoriasRoutingModule } from './categorias-routing.module';



@NgModule({
  declarations: [
    CategoriasComponent,
    VerCategoriaComponent
  ],
  imports: [
    CategoriasRoutingModule,
    CommonModule
  ]
})
export class CategoriasModule { }
