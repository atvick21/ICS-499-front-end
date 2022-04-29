import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../model/quiz';
import { QuizService } from '../service/quiz.service';
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quiz : Quiz[] =[]
  question: string;
  currentQuiz =0;
  answers: any;
  answerSelected: boolean;
  correctAnswers  =0;
  incorrectAnswers =0;
  score = false;
  random : number;
  constructor(private quizService: QuizService, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.quiz = this.quizService.getQuiz();
      this.random = Math.floor(Math.random()*this.quiz.length);
      }
  onAnswer(option: boolean){
    this.answerSelected =true;
    setTimeout(()=>{
      this.currentQuiz++;
      this.random = Math.floor(Math.random() *this.quiz.length);
      this.answerSelected = false;

    },6000);
    if(option){
      this.correctAnswers++;
    }
    else{
      this.incorrectAnswers++;
    }


  }
  displayScore(){
    this.score= true;
  }

  // getQuizes() {
  //   this.quizService.getQuiz().subscribe({
  //     next: (response: Quiz[]) => {
  //       this.quiz = response
  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       this._snackBar.open(errorResponse.error.message, "close", {
  //         duration: 2 * 1000,
  //       });
  //     }
  //   });
  //}




}