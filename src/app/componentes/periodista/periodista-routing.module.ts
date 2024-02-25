import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodistaComponent } from './periodista.component';
import { CrearNoticiaComponent } from './crear-noticia/crear-noticia.component';
import { periodistaGuard } from 'src/app/shared/guards/periodista.guard';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';



const routes: Routes = [
  {
    path: '', component: PeriodistaComponent,
    children: [
      { path: 'crear-noticia/:id', component: CrearNoticiaComponent, canActivate: [periodistaGuard] },
      { path: 'crear-categoria', component: CrearCategoriaComponent, canActivate: [periodistaGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodistaRoutingModule { }
