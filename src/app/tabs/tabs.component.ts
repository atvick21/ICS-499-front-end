import { Component, OnInit } from '@angular/core';
import {itablink} from '../itablink';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  tabLinks:Array<itablink> = [
  {
    path: 'main/periodictable',
    label: 'Sandbox'
  },
  {
    path: 'quiz',
    label: 'Quiz'
  },
  {
    path: 'flashcard/create',
    label: 'Create FlashCard'
  },  
  {
    path: 'flashcard/all',
    label: 'All FlashCards'
  },
]
  constructor() { }

  ngOnInit(): void {
  }

}
