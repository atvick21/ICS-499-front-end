import { Injectable } from '@angular/core';
import { Role } from '../enum/role.enum';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private authService: AuthenticationService) { }

  public get isAdmin(): boolean {
    if(this.authService.isUserLoggedIn())
      return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
    else return false;
  }

  public getUserRole(): string {
    return this.authService.getUserFromLocalCache().role;
  }
}
