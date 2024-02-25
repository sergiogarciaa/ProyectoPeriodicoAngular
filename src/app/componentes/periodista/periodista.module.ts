import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodistaComponent } from './periodista.component';
import { CrearNoticiaComponent } from './crear-noticia/crear-noticia.component';
import { PeriodistaRoutingModule } from './periodista-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { AdministrarCategoriasComponent } from './administrar-categorias/administrar-categorias.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { AdministrarNoticiasComponent } from './administrar-noticias/administrar-noticias.component';
import { EditarNoticiaComponent } from './editar-noticia/editar-noticia.component';



@NgModule({
  declarations: [
    PeriodistaComponent,
    CrearNoticiaComponent,
    CrearCategoriaComponent,
    AdministrarCategoriasComponent,
    EditarCategoriaComponent,
    AdministrarNoticiasComponent,
    EditarNoticiaComponent
  ],
  imports: [
    CommonModule,
    PeriodistaRoutingModule,
    ReactiveFormsModule
  ]
})
export class PeriodistaModule { }
