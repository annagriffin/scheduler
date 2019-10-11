import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseListingComponent } from './add-course-listing.component';

describe('AddCourseListingComponent', () => {
  let component: AddCourseListingComponent;
  let fixture: ComponentFixture<AddCourseListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
