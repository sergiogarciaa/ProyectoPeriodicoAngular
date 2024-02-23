import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerPanelComponent } from './ver-panel/ver-panel.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AdministracionPrincipalComponent } from './administracion-principal.component';
import { adminGuard } from 'src/app/shared/guards/admin.guard';


const routes: Routes = [
  {
    path: '', component: AdministracionPrincipalComponent,
    children: [
      { path: 'ver-panel', component: VerPanelComponent, canActivate: [adminGuard] },
      { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [adminGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}