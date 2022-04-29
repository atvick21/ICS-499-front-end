import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quiz } from '../model/quiz';
	
	@Injectable({providedIn: 'root'})
	export class QuizService {
		quiz : Quiz[] = [
			{
				questions: "What is the atomic number of Calcium?",
				answers: [
					{option: "1", correct: false},
					{option: "15", correct: false},
					{option: "18", correct: false},
					{option: "20", correct: true}
				]
			},
			{
				questions: "What is the symbol of hydrogen chemical element?",
				answers: [
					{option: "O", correct: false},
					{option: "Ca", correct: false},
					{option: "Mg", correct: false},
					{option: "H", correct: true}
				]

			},
			{
				questions: "which one of the following is correct?",
				answers: [
					{option: "Hydrogen = O ", correct: false},
					{option: "Oxygen = Mg", correct: false},
					{option: "Calcium = Ca", correct: true},
					{option: "Calcium = Na", correct: false}
				]
			},
			{
				questions: "the atomic wieght of  Bromin is ___?",
				answers: [
					{option: "35.453", correct: false},
					{option: "79.904", correct: true},
					{option: "12.01", correct: false},
					{option: "39.0983", correct: false}
				]
			},
			{
				questions: "Which one of the following is the atomic wieght of Potassium?",
				answers: [
					{option: "39.0983", correct: true},
					{option: "12.0107", correct: false},
					{option: "79.904", correct: false},
					{option: "35.453", correct: true}
				]
			},
			{
				questions: "The atomic number of hydrogen is 1?",
				answers: [
					{option: "true", correct: true},
					{option: "false", correct: false}
				]

			},
			{
				questions: "The symbol of calcium is H?",
				answers: [
					{option: "true", correct: false},
					{option: "false", correct: true}
				]


			}
			


			
			

		]
			
    
	  private apiServerUrl = environment.apiUrl;
	
	  constructor(private http: HttpClient){}
	
	//   public getQuiz(): Observable<Quiz[]> {
	//     return this.http.get<Quiz[]>(`${this.apiServerUrl}/quiz/all`);
	//   }
	
	  public create(quiz: Quiz): Observable<Quiz> {
	    return this.http.put<Quiz>(`${this.apiServerUrl}/quiz/add`, quiz);
	  }
	
	  public deleteQuiz(gameId: number): Observable<void> {
	    return this.http.delete<void>(`${this.apiServerUrl}/quiz/delete/${gameId}`);
	  }
	  getQuiz(){
		  return this.quiz;
	  }
	}