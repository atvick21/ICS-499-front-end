import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../enum/role.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit, OnDestroy {
  showFiller = false;
  public user: User;
  public isLoggedIn: boolean;
  
  constructor(private router: Router, private authService: AuthenticationService) { }

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

  public onClickLogout(): void {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.user = null;
  }

  public onClickUserManagement(): void {
    this.router.navigate(['/user/management']);
  }

  public get isAdmin(): boolean {
    if(this.isLoggedIn)
      return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
    else return false;
  }

  private getUserRole(): string {
    return this.authService.getUserFromLocalCache().role;
  }

  ngOnDestroy(): void {
    // this.subs.unsubscribe();
  }

}
