import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  @ViewChild("frontEl")
  frontEl!: ElementRef;

  @ViewChild("backEl")
  backEl!: ElementRef;

  @Input() flashcard: any = {};
  @Output() flip: EventEmitter<any> = new EventEmitter<any>();

  flipped = false;

  height: number = 100;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setMaxHeight()
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setMaxHeight();
    },100);
  }

  setMaxHeight() {
    if(this.frontEl) {
      const frontHeight = this.frontEl.nativeElement.getBoundingClientRect().height
      const backHeight = this.backEl.nativeElement.getBoundingClientRect().height
      const height: number = Math.max(frontHeight, backHeight, 100);
      this.height = height;
      /*let diff: number = height - this.height;
      diff = (diff < 0) ? diff * -1 : diff;
      if(diff > 20) {
        this.height = height;
      }*/
    }
  }

  changeCheckbox(option: any, index: number,event: any) {
    /*if (option) {
      this.setFlip(event);
      
    }*/
  }

  setBodyFlip(event: any) {
    //if(this.flipped) {
      this.setFlip(event);
    //}
  }

  setFlip(event: any) {
    this.flipped = !this.flipped;
    this.flip.emit();
    event.stopImmediatePropagation();
    event.stopPropagation();
  }

}
