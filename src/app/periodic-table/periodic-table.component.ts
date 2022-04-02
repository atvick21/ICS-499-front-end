import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.sass']
})
export class PeriodicTableComponent implements OnInit {
  pageTitle: String = "This is a page title"
  constructor() { }

  ngOnInit(): void {
  }

}
