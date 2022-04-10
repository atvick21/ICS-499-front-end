import {Component, Input, OnInit} from '@angular/core';
import { Element } from '../model/element.model';

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

}
