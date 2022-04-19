import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  public isLoggedIn: boolean;
  private user: User;

  @Output() newItemEvent = new EventEmitter<User>();

  constructor(private router: Router, private authenticationService: AuthenticationService, 
    private notificationService: NotificationService) { }

  private loggedIn(value: User) {
    this.newItemEvent.emit(value);
  }

  ngOnInit(): void {
    // if (this.authenticationService.isUserLoggedIn()) {
    //   this.sendNotification(NotificationType.WARNING, "You are already logged in.");
    //   this.router.navigateByUrl('/main/periodictable');

    // } else {
    //   this.router.navigateByUrl('/main/periodictable');
    // }
  }

  public onClickRegister(): void {
    document.getElementById("close-login-modal").click();
  }

  public onLogin(userForm: NgForm): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(userForm.value).subscribe({
        next: (response: HttpResponse<User>) => {
          // token
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.loggedIn(this.authenticationService.getUserFromLocalCache());
          document.getElementById("close-login-modal").click();
          document.getElementById("navDrawr").click();
          this.router.navigateByUrl('/main/periodictable');
          this.showLoading = false;
          userForm.reset();
          this.sendNotification(NotificationType.SUCCESS, "You've been successfully logged in.");
        },
        error: (errorResponse: HttpErrorResponse) => {
        	console.log(errorResponse);
        	this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        	this.showLoading = false;
        }
      })
    );
  }
  
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
    	this.notificationService.notify(notificationType, message);
    } else {
		  this.notificationService.notify(notificationType, "An error occured. Please try again.");
    }
  }

  // prevent memory leak 
  ngOnDestroy(): void {
  	this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
