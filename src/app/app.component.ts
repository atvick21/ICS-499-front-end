import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from './enum/notification-type.enum';
import { User } from './model/user';
import { AuthenticationService } from './service/authentication.service';
import { AuthorizationService } from './service/authorization.service';
import { NotificationService } from './service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chem Lab'
  public user: User;
  public isLoggedIn: boolean;

  constructor(private authenticationService: AuthenticationService, private authorizationService: AuthorizationService,
     private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.user = this.authenticationService.getUserFromLocalCache();
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  getLoggedIn(newItem: User) {
    this.user = newItem;
    this.isLoggedIn = true;
  }

  public onClickLogout(): void {
    this.authenticationService.logOut();
    this.sendNotification(NotificationType.SUCCESS, "You've been successfully logged out.");
    this.isLoggedIn = false;
    this.user = null;
    document.getElementById("navDrawr").click();
    this.router.navigate(['/main/periodictable']);
  }

  public get isAdmin(): boolean {
    if(this.isLoggedIn)
      return this.authorizationService.isAdmin;
    else return false;
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occured. Please try again.");
    }
  }

}
