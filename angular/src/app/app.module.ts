import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from "./components/home/home.component";
import {LoginRegisterComponent} from "./components/login-register/login-register.component";
import {DocenteComponent} from "./dashboard/docente/docente.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CorsiComponent} from "./dashboard/corsi/corsi.component";
import {ProfileComponent} from "./dashboard/profile/profile.component";
import {ExamsComponent} from "./dashboard/exams/exams.component";
import {ContattiComponent} from "./dashboard/contatti/contatti.component";
import {HeaderComponent} from "./dashboard/header/header.component";
import {SidenavComponent} from "./dashboard/sidenav/sidenav.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MainComponent} from "./dashboard/main/main.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SchedulerModule} from "./dashboard/scheduler/scheduler.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule} from "angular-calendar";
import {TokenInterceptorService} from "./token/token-interceptor.service";
import {AuthGuard} from "./guard/auth.guard";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginRegisterComponent,
    DashboardComponent,
    DocenteComponent,
    CorsiComponent,
    ProfileComponent,
    ExamsComponent,
    ContattiComponent,
    HeaderComponent,
    SidenavComponent,
    PageNotFoundComponent,
    MainComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SchedulerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule,

  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    AuthGuard,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
