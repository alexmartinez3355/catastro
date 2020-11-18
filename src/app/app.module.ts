import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Modules */
import { ComponentsModule } from './components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SolicitarCitaComponent } from './pages/solicitar-cita/solicitar-cita.component';
import { ConsultarCitaComponent } from './pages/consultar-cita/consultar-cita.component';
import { CancelarCitaComponent } from './pages/cancelar-cita/cancelar-cita.component';
import { SigninComponent } from './pages/signin/signin.component';
import { RestringidoComponent } from './pages/restringido/restringido.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    SolicitarCitaComponent,
    ConsultarCitaComponent,
    CancelarCitaComponent,
    SigninComponent,
    RestringidoComponent,
    CitasComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
