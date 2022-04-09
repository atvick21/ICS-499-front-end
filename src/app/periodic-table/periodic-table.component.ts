import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeriodicTableService } from '../service/periodic-table.service';
import { SubSink } from 'subsink';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { PeriodicTable } from '../model/periodic-table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  pageTitle: String = "Main Periodic Table";
  public user: User;
  public elements: PeriodicTable[];

  constructor(private periodicTableService: PeriodicTableService, private authService: AuthenticationService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalCache();
    this.buildPeriodicTable(true);
  }

  public buildPeriodicTable(showNotification: boolean): void {
    this.subs.add(
      this.periodicTableService.getElements().subscribe({
        next: (response: PeriodicTable[]) => {
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

  private sortElements(input: PeriodicTable[]): PeriodicTable[] {
    return input.sort((a,b) => a.atomicNumber - b.atomicNumber);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
