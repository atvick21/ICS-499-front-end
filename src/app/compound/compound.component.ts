import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Element } from '../model/element.model';
import {Observable, Subscription} from "rxjs";
import {CompoundService} from "../service/compound.service";
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.scss']
})
export class CompoundComponent implements OnInit {
  private interacted: Boolean = false;
  private eventsSubscription: Subscription;
  private modalSubscription: Subscription;
  elementsInCompound: Element[] = [];
  atomsInCompound: Map<String, number> = new Map();
  @Input() interactedElement: Element;
  @Input() events: Observable<Element>;

  displayModal: Boolean = false;
  @Input() openModal: Observable<any>
  @Output() signalModalEvent: EventEmitter<any> = new EventEmitter();


  constructor(private compoundService: CompoundService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((element) => this.addInteractedElements(element));
    this.modalSubscription = this.openModal.subscribe(() => {
      this.showModal();
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
    this.modalSubscription.unsubscribe();
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

  public showModal() {
    this.displayModal = !this.displayModal;
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

  public emitModalEvent(): void {
    this.signalModalEvent.emit()
  }

  public validateCompound() {
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
          .subscribe(response => console.log("You've discovered: " + response.body.title));
    } else {
      console.warn("Unable to save findings, no user is logged in.");
      let payload = {
        data,
        userId: null
      }
      // careful of memory leak
      this.compoundService
      .validate(payload)
        .subscribe(response => {
          this.emitModalEvent();
          console.log("You've discovered: " + response.body.title)
        });
    }
  }
}
