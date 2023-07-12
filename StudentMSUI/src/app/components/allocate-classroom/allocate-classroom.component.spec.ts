import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateClassroomComponent } from './allocate-classroom.component';

describe('AllocateClassroomComponent', () => {
  let component: AllocateClassroomComponent;
  let fixture: ComponentFixture<AllocateClassroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllocateClassroomComponent]
    });
    fixture = TestBed.createComponent(AllocateClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
