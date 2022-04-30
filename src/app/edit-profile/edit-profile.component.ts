import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { SubSink } from 'subsink';
import { NotificationType } from '../enum/notification-type.enum';
import { FileUploadStatus } from '../model/file-upload-status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public user: User;
  private subs = new SubSink();
  public fileName: string;
  public profileImg: File;
  public fileStatus = new FileUploadStatus();

  // @Output() newItemEvent = new EventEmitter<User>();
  
  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  public get currentUsername(): string {
  	return this.authenticationService.getUserFromLocalCache().username;
  }

  public onUpdateCurrentUser(user: User): void {
    const formData = this.userService.createUserFormData(this.currentUsername, user, this.profileImg);
    this.subs.add(
      this.userService.updateUser(formData).subscribe({
        next: (response: User) => {
        	this.authenticationService.addUserToLocalCache(response);
          this.fileName = null;
          this.profileImg = null;
          // this.newItemEvent.emit(response);
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully.`);
          this.router.navigateByUrl('/main/periodictable');
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImg = null;
        }
      })
    )
  }

  public onUpdateProfileImage() {
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('profileImg', this.profileImg);
    this.subs.add(
      this.userService.updateProfileImage(formData).subscribe({
        next: (event: HttpEvent<any>) => {
          this.reportUploadProgress(event);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      })
    );
  }

  public onProfileImageChange(fileName: string, profileImag: File): void {
    this.fileName = fileName;
    this.profileImg = profileImag;
    this.user.profileImgUrl = `${this.user.profileImgUrl}?time=${new Date().getTime()}`
  }

  public updateProfileImage(): void {
    this.clickButton('profile-image-input');
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occured. Please try again.");
    }
  }

  private reportUploadProgress(event: HttpEvent<any>): void {
    switch(event.type) {
    	case HttpEventType.UploadProgress:
    		this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
    		this.fileStatus.status = "progress";
    		break;
    	case HttpEventType.Response:
    		if(event.status === 200) {
    			this.user.profileImgUrl = `${event.body.profileImgUrl}?time=${new Date().getTime()}`
    			this.sendNotification(NotificationType.SUCCESS, `${event.body.firstName}\'s profile image updated successfully.`);
    			this.fileStatus.status = "done";
    			break;
    		} else {
    			this.sendNotification(NotificationType.ERROR, "Unable to upload image. Please try again.");
    			break;
    		}
    	default:
    		'end'
    }
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

}
