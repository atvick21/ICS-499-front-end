import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Element } from '../model/element.model';
import { ElementService } from '../service/element.service';

import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from "rxjs";

@Component({
  selector: 'periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.sass']
})
export class PeriodicTableComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  showFiller = false;
  elements: Element[] = [];
  pageTitle: string = 'Sandbox'
  interactedElement: Element;
  eventsSubject: Subject<Element> = new Subject<Element>();
  added: number = 0;
  categories: string[] = ['alkali-metals','alkaline-earth-metals','lanthanoids','actinoids','transition-metals','post-transition-metals','metalloids','other-nonmetals','noble-gasses','unknown'];

  @Output() sendElementMessage = new EventEmitter<Element>();
  
  constructor(private elementService: ElementService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getElements();
  }

  // select element event
  public selectElement(event: { target: any; }) {
    let elmIndex = event.target.attributes.id?.value - 1;
    this.interactedElement = this.elements[elmIndex];
    if(this.interactedElement) {
      this.sendElementMessage.emit(this.interactedElement);
      this._snackBar.open("Added " + this.interactedElement.name + " to test.", "close");
    }
  }

  async getElements() {
    this.subs.add(
      this.elementService.getElements().subscribe({
        next: (response: Element[]) => {
          this.elements = this.sortElements(response);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this._snackBar.open("failed to load periodic table data", "close");
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
