import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Course } from './models/course.model';
import { CourseListing } from './models/course-listing.model';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private webRequestService: WebRequestService) { }

  getCourses() {
    return this.webRequestService.get('courses');
  }

  addCourse(course: Course) {
    return this.webRequestService.post('courses', course );
  }

  deleteCourse(courseId: string) {
    return this.webRequestService.delete(`courses/${courseId}`);
  }

  deleteCourseListing(courseId: string) {
    return this.webRequestService.delete(`course-listings/${courseId}`);
  }

  getOneYear(year: number) {
    return this.webRequestService.get(`courses/${year}`);
  }

  updateYear(courseId: string, year: number) {
    return this.webRequestService.patch(`courses/${courseId}`, { year });
  }

  getCourseListings() {
    return this.webRequestService.get('course-listings');
  }

  addCourseListing(courseListing: CourseListing) {
    return this.webRequestService.post('course-listings', courseListing);
  }

}
