import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { map } from 'rxjs/operators';
import { CommonDetailsService } from 'src/app/services/common-details.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent {
  StudentList: any = [];
  filterValue: string | undefined;
  allStudentList$!: Observable<any[]>;
  teacherSubject: any = [];
  allStudentList: any = [];
  filteredStudentList: any = [];

  constructor(
    private studentService: StudentService,
    private commonDetailsService: CommonDetailsService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.getTeacherSubject();
    this.getAllStudents();
  }

  /* STUDENT DETAIL"S*/
  getStudents() {
    this.studentService.getStudents().subscribe((res) => {
      this.StudentList = res;
    });
  }

  onStudentChange(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.getAllocatedStudent();
  }
  getAllStudents() {
    this.commonDetailsService.getAllocateStudentDetail().subscribe(
      (allocatedstudent: any[]) => {
        this.allStudentList = allocatedstudent;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getAllocatedStudent() {
    if (this.allStudentList && this.filterValue) {
      this.filteredStudentList = this.allStudentList.filter(
        (student: { studentId: string | undefined }) =>
          student.studentId == this.filterValue
      );
    }
  }

  /* TEACHER & SUBJECT DETAIL"S*/

  getTeacherSubject() {
    this.commonDetailsService.getAllocateTeacherSubject().subscribe((res) => {
      this.teacherSubject = res;
      console.log('teacher subject', this.teacherSubject);
    });
  }
}
