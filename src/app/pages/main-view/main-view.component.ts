import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Course } from 'src/app/models/course.model';
import { CourseListing } from 'src/app/models/course-listing.model';
import { CourseService } from 'src/app/course.service';



@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  // courses: any[];
  // listings: any[];

  constructor(private courseService: CourseService) { 
  }

  board: Board = new Board('Test Board', [
    new Column('Freshmen', []), 
    new Column('Sophomore', []), 
    new Column('Junior', []),
    new Column('Senior', [])
  ]);


  ngOnInit() {

    // this.courseService.getCourses().subscribe((courses: any[]) => {
    //   this.courses = courses;
    // });

    // this.courseService.getCourseListings().subscribe((courseListing: any[]) => {
    //   this.listings = courseListing;
    // });


   
  }

  onDeleteCourseListingClick(courseId: string) {
    this.courseService.deleteCourseListing(courseId).subscribe((course: any) => {
      location.reload();
    });
  }

}
