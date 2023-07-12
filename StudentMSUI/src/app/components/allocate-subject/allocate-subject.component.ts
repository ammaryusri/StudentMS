import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherService } from 'src/app/services/teacher.service';
import { SubjectService } from 'src/app/services/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllocateSubject } from 'src/app/models/allocateSubject';
import { AllocateSubjectService } from 'src/app/services/allocate-subject.service';
import { map } from 'rxjs/operators';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-allocate-subject',
  templateUrl: './allocate-subject.component.html',
  styleUrls: ['./allocate-subject.component.scss'],
})
export class AllocateSubjectComponent {
  formValue!: FormGroup;
  allAllocatedSUb$!: Observable<any[]>;
  subj: any = [];
  teach: any = [];
  filterValue: string | undefined;
  allocateSubObj: AllocateSubject = new AllocateSubject();
  subjectNameMap: Map<number, string> = new Map();
  teacherNameMap: Map<number, string> = new Map();
  filteredSubjects: any[] = [];

  constructor(
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private allocateSubjectService: AllocateSubjectService,
    private toast: NgToastService
  ) {
    this.formValue = this.formBuilder.group({
      teacherId: [null, Validators.required],
      subjectId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTeachers();
    this.getSubjects();
    //this.getAllocatedSubject();
  }

  getTeachers() {
    this.teacherService.getTeachers().subscribe((res) => {
      this.teach = res;
      for (let i = 0; i < this.teach.length; i++) {
        if (this.teach[i].teacherId !== undefined) {
          this.teacherNameMap.set(
            this.teach[i].teacherId,
            `${this.teach[i].firstName} ${this.teach[i].lastName}`
          );
        }
      }
    });
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe((res) => {
      this.subj = res;
      for (let i = 0; i < this.subj.length; i++) {
        if (this.subj[i].subjectId !== undefined) {
          this.subjectNameMap.set(
            this.subj[i].subjectId,
            this.subj[i].subjectName
          );
        }
      }
    });
  }

  onTeacherChange(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }
  getAllocatedSubject() {
    this.allAllocatedSUb$ = this.allocateSubjectService
      .getAllocateSubject()
      .pipe(
        map((allocatedSubjects: any[]) =>
          allocatedSubjects.filter(
            (subject) => subject.teacherId == this.filterValue
          )
        )
      );
  }

  postAllocatedSubjects() {
    this.allocateSubObj.teacherId = this.formValue.value.teacherId;
    this.allocateSubObj.subjectId = this.formValue.value.subjectId;

    const allocationExists = this.allAllocatedSUb$.pipe(
      map((allocations) =>
        allocations.some(
          (allocation) =>
            allocation.teacherId == this.formValue.value.teacherId &&
            allocation.subjectId == this.formValue.value.subjectId
        )
      )
    );

    allocationExists.subscribe((exists) => {
      if (exists) {
        //alert('This allocation already exists for the selected teacher and subject.');
        this.toast.error({detail:"Error message",summary:"THIS ALLOCATION ALREADY EXISTS FOR THE SELECTED TEACHER AND SUBJECT",duration:5000})
      } else {
        this.allocateSubjectService
          .createAllocateSubject(this.allocateSubObj)
          .subscribe(
            (res) => {
              console.log('Added Sucess');
              //alert('ADD SUCESSFULL');
              this.toast.success({detail:"Sucess message",summary:"SUBJECT ALLOCATED TO TEACHER SUCESSFULLY",duration:5000})
              //this.formValue.reset();
              this.getAllocatedSubject();
            },
            (err) => {
              //alert('SOMTHING WENT WRONG');
              this.toast.error({detail:"Error message",summary:"SUBJECT ALLOCATED TO TEACHER UN-SUCESSFULLY, TRY AGAIN LATER !!",duration:5000})
            }
          );
      }
    });
  }

  deleteAlloactedSubject(row: any) {
    this.allocateSubjectService
      .deleteAllocatedSubject(row.allocateSubjectID)
      .subscribe((res) => {
        console.log('Deleted Sucess');
        //alert('DELETE SUCESSFULL');
        this.toast.success({detail:"Sucess message",summary:"ALLOCATION DELETED SUCESSFULLY",duration:5000})
        this.getAllocatedSubject();
      });
  }
}
