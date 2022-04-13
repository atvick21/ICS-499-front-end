import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LoginComponent } from './login/login.component';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: 'main/periodictable', component: PeriodicTableComponent },
  { path: '', redirectTo: '/main/periodictable', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
