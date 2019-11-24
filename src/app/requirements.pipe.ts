import { Pipe, PipeTransform } from '@angular/core';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';


@Pipe({
  name: 'requirements'
})
export class RequirementsPipe implements PipeTransform {

  transform(value: any): any {
    let values = [];
    if (value) {
      const requirementList = Object.values(value);
      for (let val in requirementList) {
        values.push(requirementList[val]);
      }
      return values;
    }
  }

}