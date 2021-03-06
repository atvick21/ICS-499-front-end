import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public createFlashcard(item: any): Observable<any> {
    console.log(item);
    return this.http.post<any>(`${this.host}/flashcards/add`, item);
  }

  public getAllFlashcard(): Observable<any> {
    return this.http.get<any>(`${this.host}/flashcards/all`);
  }

  public getFlashcardsByUserId(userId: string): Observable<any> {
    console.log("getting flashcards for userId:", userId);
    return this.http.get<any>(`${this.host}/flashcards/userflashcards/${userId}`);
  }

}
