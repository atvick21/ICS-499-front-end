import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from './enum/notification-type.enum';
import { Role } from './enum/role.enum';
import { User } from './model/user';
import { AuthenticationService } from './service/authentication.service';
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

  constructor(private authService: AuthenticationService, private router: Router, 
    private notificationService: NotificationService) {}

  getLoggedIn(newItem: User) {
    this.user = newItem;
    this.isLoggedIn = true;
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.user = this.authService.getUserFromLocalCache();
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  public onClickUserManagement(): void {
    this.router.navigate(['/user/management']);
  }

  public onClickProfile(): void {
    this.router.navigate(['/profile']);
  }

  public onClickLogout(): void {
    this.authService.logOut();
    this.sendNotification(NotificationType.SUCCESS, "You've been successfully logged out.");
    this.isLoggedIn = false;
    this.user = null;
    document.getElementById("navDrawr").click();
    this.router.navigate(['/main/periodictable']);
  }

  public get isAdmin(): boolean {
    if(this.isLoggedIn)
      return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
    else return false;
  }

  private getUserRole(): string {
    return this.authService.getUserFromLocalCache().role;
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occured. Please try again.");
    }
  }

}
