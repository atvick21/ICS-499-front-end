import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	public host = environment.apiUrl;
	private token: string;
	private loggedInUsername: string;
	private jwtHelper = new JwtHelperService();
  	
  	constructor(private http: HttpClient) { }

	public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
		return this.http.post<HttpResponse<any> | HttpErrorResponse>
		(`${this.host}/user/login`, user, {observe: 'response'});
	}

	public register(user: User): Observable<User | HttpErrorResponse> {
		return this.http.post<User | HttpErrorResponse>
		(`${this.host}/user/register`, user);
	}

	public logOut(): void {
		this.token = null;
		this.loggedInUsername = null;
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('users');
	}

  public saveToken(token: string): void {
		this.token = token;
    localStorage.setItem('token', token);
	}

  // add user to cache
  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
	}

  // get user from local cache
  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
	}

  // get token from local cache
  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {
		this.loadToken();
		if (this.token != null && this.token !== '') {
			if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
				if (!this.jwtHelper.isTokenExpired(this.token)) {
					this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
					return true;
				}
			}
		} else {
			this.logOut();
			return false;
		}
	}

}
