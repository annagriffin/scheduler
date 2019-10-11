import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/course.service';


@Component({
  selector: 'app-column-view',
  templateUrl: './column-view.component.html',
  styleUrls: ['./column-view.component.scss']
})
export class ColumnViewComponent implements OnInit {


  first: Course[];


  @Input()
  year: number;

  constructor(private courseService: CourseService) { 
  }

  ngOnInit() {

    this.courseService.getOneYear(this.year).subscribe((courses: Course[]) => {
      this.first = courses;
    });

  }


  drop(event: CdkDragDrop<Course[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      const index = event.container.id;
      const l = index.length-1;

      this.courseService.updateYear(event.item.data['_id'], +index.charAt(l)+1).subscribe(() => {
        
      }); 
      
    }
  }

  onDeleteCourseClick(courseId: string) {
    this.courseService.deleteCourse(courseId).subscribe((course: any) => {
      location.reload();
    })
  }
}
