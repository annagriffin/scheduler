import { Course } from './course.model';

export class Column {
    constructor(public name: string, public courses: Course[]) {

    }
}