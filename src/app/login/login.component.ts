import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private router: Router, private authenticationService: AuthenticationService, 
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/main/periodictable');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(user: User): void {
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          // token
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/main/periodictable');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
        	console.log(errorResponse);
        	this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
        	this.showLoading = false;
        }
      )
    );
  }
  private sendErrorNotification(notificationType: NotificationType, message: string): void {
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
