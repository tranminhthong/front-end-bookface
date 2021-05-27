import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionCommentComponent } from './emotion-comment.component';

describe('EmotionCommentComponent', () => {
  let component: EmotionCommentComponent;
  let fixture: ComponentFixture<EmotionCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
