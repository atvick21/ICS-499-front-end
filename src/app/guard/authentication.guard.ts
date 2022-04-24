import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {
	constructor(private authenticationService: AuthenticationService, private router: Router,
				private notificationService: NotificationService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.isUserLoggedIn();
	}

	private isUserLoggedIn(): boolean {
		if (this.authenticationService.isUserLoggedIn()) {
			return true;
		}
		this.router.navigate(['/main/periodictable']);
		this.notificationService.notify(NotificationType.ERROR, "You need to login to access this page.".toUpperCase());
		return false;
	}
  
}
