import { Component, OnDestroy, OnInit } from '@angular/core';
import { Element } from '../model/element.model';
import { ElementService } from '../service/element.service';

import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  showFiller = false;
  elements: Element[] = [];
  pageTitle: string = 'Sandbox'
  
  constructor(private elementService: ElementService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getElements(true);
  }

  async getElements(showNotification: boolean) {
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
