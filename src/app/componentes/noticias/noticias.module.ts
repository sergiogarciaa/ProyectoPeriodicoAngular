import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerNoticiaComponent } from './ver-noticia/ver-noticia.component';
import { NoticiasComponent } from './noticias.component';
import { NoticiasRoutingModule } from './noticias-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NoticiasComponent,
    VerNoticiaComponent
  ],
  imports: [
    NoticiasRoutingModule,
    FormsModule,
    CommonModule
  ]
})
export class NoticiasModule { }
