import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FlashCardService } from 'src/app/service/flashcard.service';

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent implements OnInit {

  flashCards: any[] = [];

  constructor(private router: Router, private service: FlashCardService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn())
      this.router.navigateByUrl('/main/periodictable');
    else
      this.getAllFlashcardsByUserId(this.authenticationService.getUserFromLocalCache().userId);
  }

  public getAllFlashcard(): void {
    this.service.getAllFlashcard().subscribe(
      (response: any) => {
        this.flashCards = response;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
      }
    );
  }

  public getAllFlashcardsByUserId(userId: string): void {
    this.service.getFlashcardsByUserId(userId).subscribe(
      (response: any) => {
        this.flashCards = response;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
      }
    );
  }

}
