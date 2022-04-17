import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Element } from '../model/element.model';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {
  @Input() isPeriodicTable: Boolean;
  @Input() element: Element;
  @Output() sendElementMessage = new EventEmitter<Element>();
  // elementAtomicWeight: Number;
  // elementAtomicNumber: Number;
  // elementAtomicMass: Number;
  // elementName: String;
  // elementSymbol: String;
  constructor() {}
  // constructor(elementAtomicWeight: Number, elementAtomicNumber: Number, elementAtomicMass: Number, elementName: String, elementSymbol: String) {
  //   this.elementAtomicWeight = elementAtomicWeight;
  //   this.elementAtomicNumber = elementAtomicNumber;
  //   this.elementAtomicMass = elementAtomicMass;
  //   this.elementName = elementName
  //   this.elementSymbol = elementSymbol;
  // }

  ngOnInit(): void {
  }

  /*TODO:
    - Will need to pass information from element in periodic table to element in compound
    - Should this be handled from the parent (periodic table component) to pass information to the compound component?
  */
  onClickPeriodicTableElement(element: Element) {
    this.sendElementMessage.emit(element);
  }
  onClick(event, className, element): void {
    console.log("Symbol: \n" + element.symbol)
  }

}
