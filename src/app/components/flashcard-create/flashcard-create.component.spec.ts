import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardCreateComponent } from './flashcard-create.component';

describe('FlashcardCreateComponent', () => {
  let component: FlashcardCreateComponent;
  let fixture: ComponentFixture<FlashcardCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
