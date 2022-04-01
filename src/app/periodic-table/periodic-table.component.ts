import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PeriodicTableModel } from "./periodic-table-model";
import { ElementModel } from "./element-model";

import { PeriodicDataModelService } from "./periodic-data-model.service";

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.sass']
})
export class PeriodicTableComponent implements AfterViewInit, OnDestroy {
  // @ts-ignore
  private model: PeriodicTableModel;

  private elementDisplayList: ElementModel[] = [];

  private routeSubscription: any;

  // @ts-ignore
  @ViewChild('canvas') public canvas: ElementRef;

  // @ts-ignore
  private context: CanvasRenderingContext2D;

  constructor(private periodicDataModelService: PeriodicDataModelService, private route: ActivatedRoute, private router: Router) {
  }

  public ngAfterViewInit(): void {
    this.model = this.periodicDataModelService.getPeriodicTableDataModel();

    this.setCanvasRenderingContext2D();
    this.initializeCanvasWidthAndHeight();
    this.fillBackGround();
    this.initializeElements();
    // subscribe to changes in the route
    this.routeSubscription = this.route.params.subscribe(params => {
      this.onRouteChanged(params['id']);
    });
  }

  private setCanvasRenderingContext2D(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  private initializeCanvasWidthAndHeight(): void {
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    const width = canvasElement.width = window.innerWidth;
    const height = canvasElement.height = window.innerHeight;
  }

  private fillBackGround(width: number = window.innerWidth, height: number = window.innerHeight): void {
    this.context.fillRect(0, 0, width, height);
  }

  // the function to call when the route is changed
  private onRouteChanged(elementId: string): void {
    // look up element via elementId parameter
    // @ts-ignore
    const element: ElementModel = this.elementDisplayList.find((e: ElementModel) => {
      return e.elementModel.name === elementId;
    });
    // set the selected element
    this.setSelectedElement(element);
    // use onMouseAction to handle everything else
    // by passing in the x and y values from the element directly
    // shift the x value in by 10 and the y down by 10 plus
    // the offset top since we do not need to
    // account for the mouse y offset when calling onMouseAction
    // in this way
    this.onMouseAction((element.x + 10), (element.y + 10 + this.canvas.nativeElement.offsetTop), true);
  }

  private initializeElements(): void {
    const elements = this.model.elements;

    for (let j = 0; j < elements.length; j++) {
      const element = new ElementModel(elements[j], this.context);

      element.drawGraphics();

      element.drawText();

      this.elementDisplayList.push(element);
    }
  }

  // a function to set the selected element
  private setSelectedElement(element: ElementModel): void {
    let j = -1;
    // loop through the whole list and set is selected to
    // false for the current isSelected element
    while (++j < this.elementDisplayList.length) {
      const e = this.elementDisplayList[j];
      if (e.isSelected) {
        e.isSelected = false;
      }
    }
    // set the new selected element's isSelected
    // property to true
    element.isSelected = true;
  }
  // handle onMouseMove for hover effect
  // and onClick from selecting an element
  private onMouseAction(pageX: number, pageY: number, navigate: boolean): void {
    let x = pageX;
    let y = pageY;
    // subtract any left or top offset when the mouse clicks
    // currently the canvas is full screen so this would
    // come into use if the canvas where within some
    // other larger frame
    x -= this.canvas.nativeElement.offsetLeft;
    y -= this.canvas.nativeElement.offsetTop;
    let j = -1;
    while (++j < this.elementDisplayList.length) {
      const element = this.elementDisplayList[j];
      // perform a hit test within the area of the element
      if ((y >= element.y) && (y <= element.y + element.height) && (x >= element.x) && (x <= element.x + element.width)) {
        // use the navigate flag to short circuit the statement
        // in the case of a click
        // otherwise use the isWithinElementBounds check to
        // drive the selected element behavior
        if (navigate || element.isWithinElementBounds === false) {
          // track the mouse when it isWithinElementBounds
          // to prevent more than one rendering pass from happening
          element.isWithinElementBounds = true;
          // if the user clicked we navigate
          if (navigate) {
            // so set the selected element
            this.setSelectedElement(element);
            // and update the route via the element's name
            this.router.navigate([`/${element.elementModel.name}`]);
          }
          // clear and re render graphics and text
          element.clear();
          element.drawGraphics();
          element.drawText();
        }

      } else {
        // if the mouse is within element bounds and
        // the element is not selected re render
        // the graphics and text when on mouse out
        if (element.isWithinElementBounds && !element.isSelected) {
          element.isWithinElementBounds = false;
          element.clear();
          element.drawGraphics();
          element.drawText();
        }
      }
    }
  }
  // on click handler for the canvas
  public onClick(eventObject: MouseEvent): void {
    this.onMouseAction(eventObject.pageX, eventObject.pageY, true);
  }
  // on mouse move handler for the canvas
  public onMouseMove(eventObject: MouseEvent) {
    this.onMouseAction(eventObject.pageX, eventObject.pageY, false);
  }
  // destroy the route subscription on ngOnDestroy
  public ngOnDestroy(): void {
  }



}
