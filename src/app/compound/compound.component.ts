import {Component, Input, OnInit} from '@angular/core';
import { Element } from '../model/element.model';
import {Observable, Subscription} from "rxjs";
import {CompoundService} from "../service/compound.service";

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.scss']
})
export class CompoundComponent implements OnInit {
  private interacted: Boolean = false;
  private eventsSubscription: Subscription;
  elementsInCompound: Element[] = [];
  atomsInCompound: Map<String, number> = new Map();
  @Input() isPeriodicTable: Boolean;
  @Input() interactedElement: Element;
  @Input() events: Observable<Element>;

  constructor(private compoundService: CompoundService) { }

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

  public validateCompound() {
    // window.alert("Number of elements in compound: " + this.elementsInCompound.length + "\nValidating compound...")
    // console.log(this.elementsInCompound);
    let data = [];

    for(let [key, value] of this.atomsInCompound.entries()) {
      data.push({"element": key, "numberOfAtoms": value});
    }

    let payload = {
      data,
      userId: "5523153010"
    }

    this.compoundService
      .validate(payload)
      .subscribe(response => console.log("You've discovered: " + response.body.title))
      // .unsubscribe()
  }
}
