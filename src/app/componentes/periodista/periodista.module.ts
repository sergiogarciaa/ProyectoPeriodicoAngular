import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodistaComponent } from './periodista.component';
import { CrearNoticiaComponent } from './crear-noticia/crear-noticia.component';
import { PeriodistaRoutingModule } from './periodista-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';



@NgModule({
  declarations: [
    PeriodistaComponent,
    CrearNoticiaComponent,
    CrearCategoriaComponent
  ],
  imports: [
    CommonModule,
    PeriodistaRoutingModule,
    ReactiveFormsModule
  ]
})
export class PeriodistaModule { }
