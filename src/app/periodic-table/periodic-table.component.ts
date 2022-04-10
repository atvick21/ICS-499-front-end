import { Component, OnInit } from '@angular/core';
import { Element } from '../model/element.model';
import { ElementService } from '../service/element.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit {
  elements: Element[] = [];
  pageTitle: String = "This is a page title"
  constructor(private ElementService: ElementService) { }

  ngOnInit(): void {
    // const testElements: Observable<Element[]> = this.ElementService.getElements();
    // console.log()
    this.getElements();
    // this.elements.push({ elementAtomicWeight: 1, elementAtomicNumber: 1, elementAtomicMass: 1.008, elementName: "Hydrogen", elementSymbol: "H", elementType: "element other-nonmetal", elementPosition: "c1 r1"});
    // this.elements.push({ elementAtomicWeight: 2, elementAtomicNumber: 2, elementAtomicMass: 4.0026, elementName: "Helium", elementSymbol: "He", elementType: "element noble-gas", elementPosition: "c18 r1"});
    // this.elements.push({ elementAtomicWeight: 3, elementAtomicNumber: 3, elementAtomicMass: 6.94, elementName: "Lithium", elementSymbol: "Li", elementType: "element alkali-metal", elementPosition: "c1 r2"});
    // this.elements.push(hydrogen);
    // this.elements.push(helium);
    // this.elements.push(lithium);
  }

  async getElements() {
    const data = this.ElementService
      .getElements()
      .subscribe((data: Element[]) => this.elements = data.sort((a, b) => (Number(a.atomicNumber) > Number(b.atomicNumber) ? 1 : -1)))
    console.log("data returned from API call: \n" + data);
  }

  sortElements() {
    this.elements.sort((a, b) => {
      let value = 0;
      if (a.atomicNumber < b.atomicNumber) {
        value = -1;
      } else if (a.atomicNumber > b.atomicNumber) {
        value = 1;
      }

      return value;
    });
  }
}
