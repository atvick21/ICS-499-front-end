import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { SubSink } from 'subsink';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/role.enum';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public user: User;
  private subs = new SubSink();
  public users: User[];
  public refreshing: boolean;
  public fileName: string;
  public profileImg: File;
  public selectedUser: User;
  public editUser = new User();

  
  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getUsers(true);
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  public get isManager(): boolean {
    return this.isAdmin || this.getUserRole() === Role.MANAGER;
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
}

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occured. Please try again.");
    }
  }

  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    this.clickButton('openUserInfo');
  }

  public onEditUser(editUser: User): void {
    this.editUser = editUser;
    this.clickButton('openUserEdit');
  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subs.add(
      this.userService.getUsers().subscribe({
        next: (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if(showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `user loaded successfully.`);
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
        
      })
    );
  }

  public get currentUsername(): string {
  	return this.authenticationService.getUserFromLocalCache().username;
  }

  public onUpdateCurrentUser(user: User): void {
  	this.refreshing = true;
    const formData = this.userService.createUserFormData(this.currentUsername, user, this.profileImg);
    this.subs.add(
      this.userService.updateUser(formData).subscribe({
        next: (response: User) => {
        	this.authenticationService.addUserToLocalCache(response);
          this.getUsers(false);
          this.fileName = null;
          this.profileImg = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully.`);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = true;
          this.profileImg = null;
        }
      })
    )
  }

}
