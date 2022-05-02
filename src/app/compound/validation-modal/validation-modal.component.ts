import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-modal',
  templateUrl: './validation-modal.component.html'
})
export class ValidationModalComponent {

  constructor(public dialogRef: MatDialogRef<ValidationModalComponent>) { }

  public confirmMessage: string;
  public wasSuccessful: string;
  public isLoggedIn: string;
}
