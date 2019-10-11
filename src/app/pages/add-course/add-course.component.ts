import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../course.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {


  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
  }

  onChangeName(courseName: string) {
    console.log(courseName);
  }


  


  onClickSubmit(data: any) {
    console.log(data);

    let newCourse: Course = {
      name: data.name,
      courseCode: data.courseCode, 
      tags: [data.credit, data.requirements], 
      year: data.year
    };

    this.courseService.addCourse(newCourse).subscribe(() => {
      this.router.navigate(['/main-view']);
    });
  }

}
