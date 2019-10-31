import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoursesPipe } from './courses.pipe';
import { ColumnViewComponent } from './pages/column-view/column-view.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { AddCourseListingComponent } from './pages/add-course-listing/add-course-listing.component';
import { SearchComponent } from './pages/search/search.component';
import { SearchService } from './search.service';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    CoursesPipe,
    ColumnViewComponent,
    AddCourseComponent,
    AddCourseListingComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }