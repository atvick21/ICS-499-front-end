import {Component, Input, OnInit} from '@angular/core';
import { Element } from '../model/element.model';
import { CompoundComponent } from "../compound/compound.component";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {
  @Input() element: Element;
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
  onClick(event, className, element): void {
    console.log("Symbol: \n" + element.symbol)
  }

}
