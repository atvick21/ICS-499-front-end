import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { UserComponent } from './user/user.component';
import { QuizComponent } from './quiz/quiz.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { AuthorizationGuard } from './guard/authorization.guard';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: 'main/periodictable', component: PeriodicTableComponent },
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard, AuthorizationGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthenticationGuard] },
  { path: 'flashcard', component: FlashcardComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/main/periodictable', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
