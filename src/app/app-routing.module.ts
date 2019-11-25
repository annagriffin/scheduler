import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { AddCourseListingComponent } from './pages/add-course-listing/add-course-listing.component';
import { SearchComponent } from './pages/search/search.component';
import { CourseListingViewComponent } from './pages/course-listing-view/course-listing-view.component';
import { AddRequirementComponent } from './pages/add-requirement/add-requirement.component';


const routes: Routes = [
  { path: 'main-view', component: MainViewComponent },
  { path: '', redirectTo: '/main-view', pathMatch: 'full' },
  { path: 'add-course', component: AddCourseComponent},
  { path: 'add-course-listing', component: AddCourseListingComponent },
  { path: 'search', component: SearchComponent},
  { path: 'course-listing-view', component: CourseListingViewComponent},
  { path: 'add-requirement', component: AddRequirementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
