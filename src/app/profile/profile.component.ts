import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;
  
  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  public onClickEdit(): void {
    this.router.navigate(['/editprofile']);
  }
}
