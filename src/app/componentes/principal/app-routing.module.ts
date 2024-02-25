import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegistroComponent } from './registro/registro.component';
import { PrincipalComponent } from './principal.component';



const routes: Routes = [
  { path: '', component: PrincipalComponent, children:[
    { 
      path: 'principal/dashboard', 
      component: DashboardComponent, 
      ...canActivate(()=> redirectUnauthorizedTo(['/principal/login']))
    },
    { path: 'principal/registro', component: RegistroComponent },
    { path: 'principal/login', component: LoginComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
