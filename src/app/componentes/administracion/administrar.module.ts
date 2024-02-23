import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionPrincipalComponent } from './administracion-principal.component';
import { VerPanelComponent } from './ver-panel/ver-panel.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import {AdministracionRoutingModule} from './administracion-routing.module';



@NgModule({
  declarations: [
    AdministracionPrincipalComponent,
    VerPanelComponent,
    EditarUsuarioComponent 
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdministrarModule { }
