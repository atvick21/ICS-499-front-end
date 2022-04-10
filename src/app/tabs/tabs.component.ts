import { Component, OnInit } from '@angular/core';
import { Itablink } from '../itablink';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  
  tabLinks:Array<Itablink> = [
    {
        path: 'about',
        label: 'Sandbox'
    },
    {
        path: 'about',
        label: 'Quiz'
    },
    {
        path: 'about',
        label: 'Flashcards'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
