import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FlashCardService } from 'src/app/service/flashcard.service';

@Component({
  selector: 'app-flashcard-create',
  templateUrl: './flashcard-create.component.html',
  styleUrls: ['./flashcard-create.component.scss']
})
export class FlashcardCreateComponent implements OnInit {

  public showLoading: boolean;

  constructor(private router: Router, private service: FlashCardService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/main/periodictable');
    } 
  }

  public createFlashcard(item: any): void {
    this.showLoading = true;
    
    this.service.createFlashcard(item).subscribe(
      (response: HttpResponse<any>) => {
        // token
        
        //this.router.navigateByUrl('/main/periodictable');
        this.showLoading = false;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.showLoading = false;
      }
    );
  }

}
