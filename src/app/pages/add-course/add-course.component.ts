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

  courseName: string;
  constructor(private courseService: CourseService, private router: Router) { }
  ngOnInit() {


  }

  
  onChangeName(courseName: string) {
    this.courseName = courseName;
  }


  


  onClickSubmit(data: any) {
    let credits = this.handleCredits(data.creditengr, data.creditmth, data.creditsci, data.creditahs);

    let newCourse: Course = {
      name: this.courseName,
      tag: data.requirement,
      credits: credits, 
      year: data.year
    };

    this.courseService.addCourse(newCourse).subscribe(() => {
      this.router.navigate(['/main-view']);
    });
  }


  handleCredits(engr: string, mth: string, sci:string, ahs: string) {
    let creditStrings = [engr, mth, sci, ahs];
    var creditNumbers: number[] = [];

    for (let item of creditStrings) {
      if (!item) {
        creditNumbers.push(0)
      } else {
        creditNumbers.push(parseInt(item))
      }
    }

    return creditNumbers
  }

}
