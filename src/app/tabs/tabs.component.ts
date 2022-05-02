import { Component, Input, OnInit } from '@angular/core';
import {itablink} from '../itablink';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() isLoggedIn: boolean;

  public tabLinks:Array<itablink>;

  constructor() { }

  ngOnInit(): void {
    this.tabLinks = this.getTabLinks();
  }

  public getTabLinks(): Array<itablink> {
    return [
      {
        path: 'main/periodictable',
        label: 'Sandbox'
      },
      {
        path: 'quiz',
        label: 'Quiz'
      },
      {
        path: 'flashcard',
        label: 'Flashcards'
      }
    ]    
  }

}
