import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { QuizComponent } from './quiz/quiz.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ElementComponent } from './element/element.component';
import { ElementService } from './service/element.service';
import { CompoundComponent } from './compound/compound.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TabsComponent } from './tabs/tabs.component';
import { FlashcardListComponent } from './components/flashcard-list/flashcard-list.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { FlashcardCreateComponent } from './components/flashcard-create/flashcard-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PeriodicTableComponent,
    ElementComponent,
    RegisterComponent,
    UserComponent,
    QuizComponent,
    CompoundComponent,
    TabsComponent,
    UserComponent,
    FlashcardListComponent,
    FlashcardComponent,
    FlashcardCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: [NotificationService, AuthenticationGuard, AuthenticationService, ElementService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
