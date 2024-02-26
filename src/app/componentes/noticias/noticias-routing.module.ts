import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './noticias.component';
import { VerNoticiaComponent } from './ver-noticia/ver-noticia.component';

const routes: Routes = [
  {
    path: '', component: NoticiasComponent,
    children: [
      { path: 'ver-noticia/:id', component: VerNoticiaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticiasRoutingModule { }
