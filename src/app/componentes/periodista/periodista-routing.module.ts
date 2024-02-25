import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodistaComponent } from './periodista.component';
import { CrearNoticiaComponent } from './crear-noticia/crear-noticia.component';
import { periodistaGuard } from 'src/app/shared/guards/periodista.guard';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { AdministrarCategoriasComponent } from './administrar-categorias/administrar-categorias.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { AdministrarNoticiasComponent } from './administrar-noticias/administrar-noticias.component';
import { EditarNoticiaComponent } from './editar-noticia/editar-noticia.component';



const routes: Routes = [
  {
    path: '', component: PeriodistaComponent,
    children: [
      { path: 'crear-noticia/:id', component: CrearNoticiaComponent, canActivate: [periodistaGuard] },
      { path: 'administrar-categorias', component: AdministrarCategoriasComponent, canActivate: [periodistaGuard] },
      { path: 'administrar-noticias', component: AdministrarNoticiasComponent, canActivate: [periodistaGuard] },
      { path: 'editar-noticia/:id', component: EditarNoticiaComponent, canActivate: [periodistaGuard] },
      { path: 'editar-categoria/:id', component: EditarCategoriaComponent, canActivate: [periodistaGuard] },
      { path: 'crear-categoria', component: CrearCategoriaComponent, canActivate: [periodistaGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodistaRoutingModule { }
