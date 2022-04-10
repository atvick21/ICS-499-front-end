import { Component, OnInit } from '@angular/core';
import {Itablink} from '../itablink';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  tabLinks:Array<Itablink> = [
  {
    path: 'main/periodictable',
    label: 'sandbox'
  }
]
  constructor() { }

  ngOnInit(): void {
  }

}
