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
  // @Output() flip: EventEmitter<any> = new EventEmitter<any>();

  flipped = false;

  height: number = 100;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setMaxHeight()
  }

  constructor(private router: Router, private service: FlashCardService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn())
      this.router.navigateByUrl('/main/periodictable');
    else
      this.getAllFlashcardsByUserId(this.authenticationService.getUserFromLocalCache().userId);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setMaxHeight();
    },100);
  }

  setMaxHeight() {
    if(this.frontEl) {
      const frontHeight = this.frontEl.nativeElement.getBoundingClientRect().height
      const backHeight = this.backEl.nativeElement.getBoundingClientRect().height
      const height: number = Math.max(frontHeight, backHeight, 100);
      this.height = height;
    }
  }

  flipCard(event: any) {
    this.flipped = !this.flipped;
    event.stopImmediatePropagation();
    event.stopPropagation();
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

  public getAllFlashcard(): void {
    this.service.getAllFlashcard().subscribe(
      (response: any) => {
        this.flashcards = response;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
      }
    );
  }

  public getAllFlashcardsByUserId(userId: string): void {
    this.service.getFlashcardsByUserId(userId).subscribe(
      (response: any) => {
        this.flashcards = response;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
      }
    );
  }

}
