import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateSubjectComponent } from './allocate-subject.component';

describe('AllocateSubjectComponent', () => {
  let component: AllocateSubjectComponent;
  let fixture: ComponentFixture<AllocateSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllocateSubjectComponent]
    });
    fixture = TestBed.createComponent(AllocateSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
