import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './enum/role.enum';
import { User } from './model/user';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chem Lab'
  public user: User;
  public isLoggedIn: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.user = this.authService.getUserFromLocalCache();
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  public onClickLogin(): void {
    this.router.navigate(['/login']);
  }

  public onClickUserManagement(): void {
    this.router.navigate(['/user/management']);
  }


  public onClickLogout(): void {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.user = null;
  }

  public get isAdmin(): boolean {
    if(this.isLoggedIn)
      return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
    else return false;
  }

  private getUserRole(): string {
    return this.authService.getUserFromLocalCache().role;
  }

}
