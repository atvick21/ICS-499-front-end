import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FlashCardService } from 'src/app/service/flashcard.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  flashcards: any[] = [];
  flashcard: any = {};
  allCards: boolean = false;

  constructor(private router: Router, private service: FlashCardService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn())
      this.router.navigateByUrl('/main/periodictable');
    else
      this.getAllFlashcardsByUserId(this.authenticationService.getUserFromLocalCache().userId);
  }

  flipCard(id: number) {
    if(!this.flashcards[id]['flipped']) {
      document.getElementById(String(id)).classList.add("flip");
      this.flashcards[id]['flipped'] = true;
    } else {
      document.getElementById(String(id)).classList.remove("flip");
      this.flashcards[id]['flipped'] = false;
    }
  }

  public createFlashcard(item: any): void {
    let userId = this.authenticationService.getUserFromLocalCache().userId;
    item[ "userId" ] = userId;
    this.service.createFlashcard(item).subscribe({
      next: (response: HttpResponse<any>) => {
        this.getAllFlashcardsByUserId(this.authenticationService.getUserFromLocalCache().userId);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
      }
    });
  }

  public getAllFlashcardsByUserId(userId: string): void {
    this.service.getFlashcardsByUserId(userId).subscribe({
      next: (response: any) => {
        this.flashcards = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
      }
    });
  }

  displayCards() {
    this.allCards = !this.allCards;
  }

}
