import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../model/quiz';
import { QuizService } from '../service/quiz.service';
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import { AuthenticationService } from '../service/authentication.service';


@Component({
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizzes : Quiz[] = [];
  question: string;
  currentQuiz = 0;
  answer: any;
  answerSelected: boolean;
  correctAnswers = 0;
  incorrectAnswers = 0;
  score = false;
  random : number;
  
  constructor(private quizService: QuizService, private _snackBar: MatSnackBar, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.quizService.getQuizByUserId(this.authenticationService.getUserFromLocalCache().userId).subscribe(data => {
      this.quizzes = data;
    });
    this.random = Math.floor(Math.random()*this.quizzes.length);
  }

  onAnswer(answer: string): boolean {
    this.answerSelected =true;

    setTimeout(() => {
      this.currentQuiz++;
      this.random = Math.floor(Math.random() *this.quizzes.length);
      this.answerSelected = false;
    }, 6000);

    if (answer == this.quizzes[this.random].answer) {
      this.correctAnswers++;
      return true;
    } else {
      this.incorrectAnswers++;
      return false;
    }
  }

  displayScore() {
    this.score = true;
  }

}
