import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { Requirement } from 'src/app/models/requirement.model';


@Component({
  selector: 'app-requirements-view',
  templateUrl: './requirements-view.component.html',
  styleUrls: ['./requirements-view.component.scss']
})
export class RequirementsViewComponent implements OnInit {

  requirements: Requirement[];
  constructor(private courseService: CourseService) { }


  ngOnInit() {
    this.courseService.getRequirements().subscribe((requirements: Requirement[]) => {
      this.requirements = requirements;
      console.log(this.requirements)
    });

  }


  toggle(event: any) {
    let checked = event.srcElement.checked;
  }


}
