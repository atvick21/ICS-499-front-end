import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FlashCardService } from 'src/app/service/flashcard.service';

@Component({
  selector: 'app-flashcard-create',
  templateUrl: './flashcard-create.component.html',
  styleUrls: ['./flashcard-create.component.scss']
})
export class FlashcardCreateComponent {
  
  constructor(private service: FlashCardService, private authenticationService: AuthenticationService) { }

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

}
