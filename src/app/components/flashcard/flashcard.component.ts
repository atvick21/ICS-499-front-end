import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, HostListener, ElementRef } from '@angular/core';
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

  @ViewChild("frontEl")
  frontEl!: ElementRef;

  @ViewChild("backEl")
  backEl!: ElementRef;

  flashcard: any = {};

  flipped = false;

  constructor(private router: Router, private service: FlashCardService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn())
      this.router.navigateByUrl('/main/periodictable');
    else
      this.getAllFlashcardsByUserId(this.authenticationService.getUserFromLocalCache().userId);
  }

  flipCard(event: any) {
    this.flipped = !this.flipped;
  }

  public createFlashcard(item: any): void {
    let userId = this.authenticationService.getUserFromLocalCache().userId;
    item[ "userId" ] = userId;
    // console.log(item);
    this.service.createFlashcard(item).subscribe({
      next: (response: HttpResponse<any>) => {       
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
      }
    });
  }

  // public getAllFlashcard(): void {
  //   this.service.getAllFlashcard().subscribe(
  //     (response: any) => {
  //       this.flashcards = response;
  //     },
  //     (errorResponse: HttpErrorResponse) => {
  //       console.error(errorResponse);
  //     }
  //   );
  // }

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

}
