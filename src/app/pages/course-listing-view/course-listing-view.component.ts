import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { CourseListing } from 'src/app/models/course-listing.model';


@Component({
  selector: 'app-course-listing-view',
  templateUrl: './course-listing-view.component.html',
  styleUrls: ['./course-listing-view.component.scss']
})
export class CourseListingViewComponent implements OnInit {

  listings: CourseListing[]

  constructor(private courseService: CourseService) { }

  ngOnInit() {

    this.courseService.getCourseListings().subscribe((courseListings: CourseListing[]) => {
      this.listings = courseListings;
    })


  }


  onDeleteCourseListingClick(courseListingId: string) {
    this.courseService.deleteCourseListing(courseListingId).subscribe((courseListing: any) => location.reload())
  }

}
