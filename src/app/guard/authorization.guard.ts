import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthorizationService } from '../service/authorization.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router,
    private notificationService: NotificationService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isAuthorized();
  }

  private isAuthorized(): boolean {
    if(this.authorizationService.isAdmin) {
      return true;
    }
    this.router.navigate(['/main/periodictable']);
		this.notificationService.notify(NotificationType.ERROR, "You are not authorizaed to access this page.".toUpperCase());
    return false;
  }
  
}
