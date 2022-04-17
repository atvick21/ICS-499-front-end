import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../enum/role.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { Element } from '../model/element.model';
import { ElementService } from '../service/element.service';

import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import {Subject} from "rxjs";

@Component({
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  showFiller = false;
  public user: User;
  public isLoggedIn: boolean;
  elements: Element[] = [];
  pageTitle:string ='Sandbox'
  
  interactedElement: Element;
  eventsSubject: Subject<Element> = new Subject<Element>();
  isCompound = false;

  constructor(private elementService: ElementService, private router: Router, private authService: AuthenticationService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.user = this.authService.getUserFromLocalCache();
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    this.getElements(true);
  }

  public receiveMessage($event) {
    this.interactedElement = $event;
    this.emitInteractedEvent($event);
  }

  public emitInteractedEvent(element: Element) {
    this.eventsSubject.next(element);
  }

  public onClickLogin(): void {
    this.router.navigate(['/login']);
  }

  public onClickLogout(): void {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.user = null;
  }

  public onClickUserManagement(): void {
    this.router.navigate(['/user/management']);
  }

  public get isAdmin(): boolean {
    if(this.isLoggedIn)
      return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
    else return false;
  }

  private getUserRole(): string {
    return this.authService.getUserFromLocalCache().role;
  }

  async getElements(showNotification: boolean) {
    // const data = this.ElementService
    //   .getElements()
    //   .subscribe((data: Element[]) => this.elements = data.sort((a, b) => (Number(a.atomicNumber) > Number(b.atomicNumber) ? 1 : -1)))
    // console.log("data returned from API call: \n" + data);

    this.subs.add(
      this.elementService.getElements().subscribe({
        next: (response: Element[]) => {
          // this.userService.addUsersToLocalCache(response);
          this.elements = this.sortElements(response);
          // this.refreshing = false;
          if(showNotification) {
            this._snackBar.open("loaded elements", "close", {
              duration: 5 * 1000,
            });
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          this._snackBar.open(errorResponse.error.message, "close");
        }
      })
    );
  }

  private sortElements(input: Element[]): Element[] {
    return input.sort((a,b) => a.atomicNumber - b.atomicNumber);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
