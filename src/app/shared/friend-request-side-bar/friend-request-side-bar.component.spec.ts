import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestSideBarComponent } from './friend-request-side-bar.component';

describe('FriendRequestSideBarComponent', () => {
  let component: FriendRequestSideBarComponent;
  let fixture: ComponentFixture<FriendRequestSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendRequestSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendRequestSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
