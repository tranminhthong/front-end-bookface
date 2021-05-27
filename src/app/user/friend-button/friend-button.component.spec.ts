import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendButtonComponent } from './friend-button.component';

describe('FriendButtonComponent', () => {
  let component: FriendButtonComponent;
  let fixture: ComponentFixture<FriendButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
