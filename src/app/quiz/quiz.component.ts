import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../model/quiz';
import { QuizService } from '../service/quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quiz : Quiz[] =[]
  questions: string;
  currentQuiz =0;
  answers: any;
  answerSelected: boolean;
  correctAnswers  =0;
  incorrectAnswers =0;
  score = false;
  random : number;
  constructor(private quizService: QuizService) { }
  
    ngOnInit(): void {
      this.quiz = this.quizService.getQuiz();
      this.random = Math.floor(Math.random()*this.quiz.length)
      
  }
  onAnswer(option: boolean){
    this.answerSelected =true;
    setTimeout(()=>{
      this.currentQuiz++;
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
 
  
 

}

