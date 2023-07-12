import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { SubjectComponent } from './components/subject/subject.component';
import { AllocateClassroomComponent } from './components/allocate-classroom/allocate-classroom.component';
import { AllocateSubjectComponent } from './components/allocate-subject/allocate-subject.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

const routes: Routes = [
  {
    component: StudentComponent,
    path: '',
  },
  {
    component: TeacherComponent,
    path: 'teacher',
  },
  {
    component: ClassroomComponent,
    path: 'classroom',
  },
  {
    component: SubjectComponent,
    path: 'subject',
  },
  {
    component: AllocateClassroomComponent,
    path: 'allocateClass',
  },
  {
    component: AllocateSubjectComponent,
    path: 'allocateSubject',
  },
  {
    component: StudentDetailComponent,
    path: 'studentDetails',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
