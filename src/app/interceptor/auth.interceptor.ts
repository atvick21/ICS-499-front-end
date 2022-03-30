import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, HttpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authenticationService.host}/user/login`)) {
      return HttpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authenticationService.host}/user/register`)) {
      return HttpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authenticationService.host}/user/resetpassword`)) {
      return HttpHandler.handle(httpRequest);
    }
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({setHeaders: { Authorization: `Bearer ${token}` }});
    return HttpHandler.handle(request);
  }
}
