import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LoginComponent } from './login/login.component';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { QuizComponent } from './quiz/quiz.component';
import { FlashcardListComponent } from './components/flashcard-list/flashcard-list.component';
import { FlashcardCreateComponent } from './components/flashcard-create/flashcard-create.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: 'main/periodictable', component: PeriodicTableComponent },
  { path: '', redirectTo: '/main/periodictable', pathMatch: 'full' },
  { path: 'flashcard/all', component: FlashcardListComponent},
  { path: 'flashcard/create', component: FlashcardCreateComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
