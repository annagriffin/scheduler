import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListingViewComponent } from './course-listing-view.component';

describe('CourseListingViewComponent', () => {
  let component: CourseListingViewComponent;
  let fixture: ComponentFixture<CourseListingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
