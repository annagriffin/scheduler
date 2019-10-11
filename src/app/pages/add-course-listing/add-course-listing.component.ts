import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseListing } from '../../models/course-listing.model';
import { CourseService } from '../../course.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-course-listing',
  templateUrl: './add-course-listing.component.html',
  styleUrls: ['./add-course-listing.component.scss']
})
export class AddCourseListingComponent implements OnInit {

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
  }

  onClickSubmit(data: any) {

    let newCourseListing: CourseListing = {
      name: data.name,
      courseCode: data.courseCode
    }

    this.courseService.addCourseListing(newCourseListing).subscribe(() => {
      this.router.navigate(['/main-view']);
    });
  }

}

