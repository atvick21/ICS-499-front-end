import {Component, Input, OnInit} from '@angular/core';
import { Element } from '../model/element.model';
import {Observable, Subscription} from "rxjs";
import {CompoundService} from "../service/compound.service";
import { AuthenticationService } from '../service/authentication.service';
import {Compound} from "../model/compound";
import { HttpErrorResponse, HttpEvent, HttpResponse, HttpEventType } from "@angular/common/http";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ValidationModalComponent } from "./validation-modal/validation-modal.component";

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.scss']
})

export class CompoundComponent implements OnInit {
  private interacted: Boolean = false;
  private eventsSubscription: Subscription;
  elementsInCompound: Element[] = [];
  dialogRef: MatDialogRef<ValidationModalComponent>;
  atomsInCompound: Map<String, number> = new Map();
  @Input() interactedElement: Element;
  @Input() events: Observable<Element>;
  public progressBar: boolean = false;

  constructor(private compoundService: CompoundService, private authenticationService: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((element) => this.addInteractedElements(element));
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  public getInteracted(): Boolean {
    return this.interacted;
  }

  public getInteractedElement(): Element {
    return this.interactedElement;
  }

  public getElementsInCompound(): Element[] {
    return this.elementsInCompound;
  }

  public addInteractedElements(element: Element) {
    let tempAtoms = this.atomsInCompound.get(element.symbol)
    this.elementsInCompound.push(element);
    if ( tempAtoms == null) {
      this.atomsInCompound.set(element.symbol, 1)
    } else {
      this.atomsInCompound.set(element.symbol, tempAtoms + 1)
    }
    console.log("Call in Compound.\nSymbol: \n" + element.symbol);
  }

  public removeElementFromCompound(index: number, element: Element) {
    let tempAtoms = this.atomsInCompound.get(element.symbol)
    this.elementsInCompound.splice(index, 1)
    if (tempAtoms == 1) {
      this.atomsInCompound.delete(element.symbol)
    } else {
      this.atomsInCompound.set(element.symbol, tempAtoms - 1)
    }
  }

  public openConfirmationDialogFail(response: HttpErrorResponse) {
    this.dialogRef = this.dialog.open(ValidationModalComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.wasSuccessful = "Uh oh!"
    if (response.status == 404) {
      this.dialogRef.componentInstance.confirmMessage = "It doesn't look like that is a valid compound, please try again!"
    } else {
      this.dialogRef.componentInstance.confirmMessage = "We're having trouble validating...Please try again."
    }
  }

  public openConfirmationDialogSuccess(response: HttpResponse<Compound>, isLoggedIn: boolean) {
    this.dialogRef = this.dialog.open(ValidationModalComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.wasSuccessful = "Success!"
    this.dialogRef.componentInstance.confirmMessage = "You've discovered: " + response.body.title;

    if (!isLoggedIn) {
      this.dialogRef.componentInstance.isLoggedIn = "Log in/register to save these results for a quiz!"
    }
  }

  public validateCompound() {
    this.progressBar = true;
    // window.alert("Number of elements in compound: " + this.elementsInCompound.length + "\nValidating compound...")
    // console.log(this.elementsInCompound);
    let data = [];

    // build list of elements
    for(let [key, value] of this.atomsInCompound.entries()) {
      data.push({"element": key, "numberOfAtoms": value});
    }

    // to do: the subscribe method should call back an HTTP error that sends a front-end notification
    if(this.authenticationService.isUserLoggedIn()) {
      let payload = {
        data,
        userId: this.authenticationService.getUserFromLocalCache().userId
      }
      // careful of memory leak
      this.compoundService
        .validate(payload)
          .subscribe({
            next: (response: HttpResponse<Compound>,) => {
              this.openConfirmationDialogSuccess(response, true);
              this.progressBar = false;
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.openConfirmationDialogFail(errorResponse);
              this.progressBar = false;
            }
          });
    } else {
      console.warn("Unable to save findings, no user is logged in.");
      let payload = {
        data,
        userId: null
      }
      // careful of memory leak
      this.compoundService
        .validate(payload)
        .subscribe({
          next: (response: HttpResponse<Compound>) => {
            this.openConfirmationDialogSuccess(response, false);
            this.progressBar = false;
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.openConfirmationDialogFail(errorResponse);
            this.progressBar = false;
          }
        });
    }
  }
}
