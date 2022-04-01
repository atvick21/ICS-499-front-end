import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import {RouterModule} from "@angular/router";
import { PeriodicDataModelService } from './periodic-table/periodic-data-model.service';

@NgModule({
  declarations: [
    AppComponent,
    PeriodicTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: PeriodicTableComponent, pathMatch: 'full' }
    ])
  ],
  providers: [PeriodicDataModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
