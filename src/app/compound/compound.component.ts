import { Component, OnInit } from '@angular/core';
import { Element } from '../model/element.model';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.scss']
})
export class CompoundComponent implements OnInit {
  elementsInCompound: Element[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addElement(element: Element): void {
    this.elementsInCompound.push(element);
  }

  static addElement(element) {
    this.addElement(element)
  }
}
