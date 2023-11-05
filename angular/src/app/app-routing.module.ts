import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CorsiComponent } from './dashboard/corsi/corsi.component';
import { SchedulerComponent } from './dashboard/scheduler/scheduler.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ExamsComponent } from './dashboard/exams/exams.component';
import { DocenteComponent } from './dashboard/docente/docente.component';
import { ContattiComponent } from './dashboard/contatti/contatti.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'autenticazione', component: LoginRegisterComponent },
    {
     path: 'dashboard',
      canActivate: [AuthGuard],
      children: [
        { path: '', component: DashboardComponent },
        { path: 'corsi', component: CorsiComponent },
        { path: 'scheduler', component: SchedulerComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'esami', component: ExamsComponent },
        { path: 'docenti', component: DocenteComponent },
        { path: 'contatti', component: ContattiComponent },
      ],
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
