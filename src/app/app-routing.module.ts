import { SigninComponent } from './pages/signin/signin.component';
import { CancelarCitaComponent } from './pages/cancelar-cita/cancelar-cita.component';
import { ConsultarCitaComponent } from './pages/consultar-cita/consultar-cita.component';
import { SolicitarCitaComponent } from './pages/solicitar-cita/solicitar-cita.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'inicio'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'inicio', component: InicioComponent
  },
  {
    path: 'solicitar-cita', component: SolicitarCitaComponent
  },
  {
    path: 'consultar-cita', component: ConsultarCitaComponent
  },
  {
    path: 'cancelar-cita', component: CancelarCitaComponent
  },
  {
    path: 'signin', component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
