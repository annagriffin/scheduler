import { Pipe, PipeTransform } from '@angular/core';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

@Pipe({
  name: 'courses'
})
export class CoursesPipe implements PipeTransform {

  transform(value: any): any {
    let values = [];
    if (value) {
      const courseList= Object.values(value);
      for (let val in courseList) {
        values.push(courseList[val]);
      }
      return values;
    }


    

  }
}
