import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quiz } from '../model/quiz';

	@Injectable({providedIn: 'root'})
	export class QuizService {

	  private apiServerUrl = environment.apiUrl;

	  constructor(private http: HttpClient){}

	  public getQuiz(): Observable<Quiz[]> {
	    return this.http.get<Quiz[]>(`${this.apiServerUrl}/quiz/all`);
	  }

	  public create(quiz: Quiz): Observable<Quiz> {
	    return this.http.put<Quiz>(`${this.apiServerUrl}/quiz/add`, quiz);
	  }

	  public getQuizByUserId(userId: string): Observable<Quiz[]> {
		console.log("getting quizes for userId:", userId);
		return this.http.get<Quiz[]>(`${this.apiServerUrl}/quiz/getbyuserid/${userId}`);
	  }

	  public deleteQuiz(gameId: number): Observable<void> {
	    return this.http.delete<void>(`${this.apiServerUrl}/quiz/delete/${gameId}`);
	  }
	}
