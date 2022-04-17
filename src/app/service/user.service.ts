import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { CustomHttpResponse } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
	private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public editUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/edit`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`);
  }

  // could be better to pass any 
  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(`${this.host}/user/updateprofileimg`, formData,
      {
        reportProgress: true,
        observe: "events"
      });
  }

  public deleteUser(username: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${username}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  public createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImg', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }

  public createEditUserFormData(selectedUserId: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    console.log(selectedUserId);
    formData.append('userId', selectedUserId);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImg', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    // console.log(formData);
    return formData;
  }

}
