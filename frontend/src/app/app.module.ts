import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importa HttpClientModule y las funciones necesarias
import { Routes, RouterModule } from '@angular/router';
import { GastoService } from './services/gasto.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { FormsModule } from '@angular/forms';
import { ImpuestosComponent } from './components/impuestos/impuestos.component';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './auth.guard';

const rutas: Routes = [
  { path: 'informacion', component: InformacionComponent },
  { path: 'impuestos', component: ImpuestosComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'formulario', component: FormularioComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InformacionComponent,
    FormularioComponent,
    ReporteComponent,
    ImpuestosComponent,
    LoginComponent,
    TasksComponent,
    RegistroComponent,
    PrivateTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(rutas) 
  ],
  providers: [
    provideHttpClient(withFetch()),
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
