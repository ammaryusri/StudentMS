import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { SubjectComponent } from './components/subject/subject.component';
import { HeaderComponent } from './re-components/header/header.component';
import { AllocateSubjectComponent } from './components/allocate-subject/allocate-subject.component';
import { AllocateClassroomComponent } from './components/allocate-classroom/allocate-classroom.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    ClassroomComponent,
    TeacherComponent,
    SubjectComponent,
    HeaderComponent,
    AllocateSubjectComponent,
    AllocateClassroomComponent,
    StudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
