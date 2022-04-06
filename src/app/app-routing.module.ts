import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/management', component: UserComponent },
  { path: 'main/periodictable', component: PeriodicTableComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
