import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { AllocateClassroom } from 'src/app/models/allocateClassroom';
import { AllocateClassroomService } from 'src/app/services/allocate-classroom.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-allocate-classroom',
  templateUrl: './allocate-classroom.component.html',
  styleUrls: ['./allocate-classroom.component.scss'],
})
export class AllocateClassroomComponent {
  formValue!: FormGroup;
  teach: any = [];
  teacherNameMap: Map<number, string> = new Map();
  classroom: any = [];
  classroomNameMap: Map<number, string> = new Map();
  filterValue: string | undefined;
  allAllocatedClassroom$!: Observable<any[]>;
  allocateClasroomObj: AllocateClassroom = new AllocateClassroom();

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private classroomService: ClassroomService,
    private allocateClassroomService: AllocateClassroomService,
    private toast: NgToastService
  ) {
    this.formValue = this.formBuilder.group({
      teacherId: [null, Validators.required],
      classroomId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTeachers();
    this.getClassrooms();
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

  getClassrooms() {
    this.classroomService.getClassrooms().subscribe((res) => {
      this.classroom = res;
      for (let i = 0; i < this.classroom.length; i++) {
        if (this.classroom[i].classroomId !== undefined) {
          this.classroomNameMap.set(
            this.classroom[i].classroomId,
            this.classroom[i].classroomName
          );
        }
      }
    });
  }

  onTeacherChange(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }

  getAllocatedClassroom() {
    this.allAllocatedClassroom$ = this.allocateClassroomService
      .getAllocateClassroom()
      .pipe(
        map((allocatedClassroom: any[]) =>
          allocatedClassroom.filter(
            (classrom) => classrom.teacherId == this.filterValue
          )
        )
      );
  }

  postAllocatesClassrooms() {
    this.allocateClasroomObj.teacherId = this.formValue.value.teacherId;
    this.allocateClasroomObj.classroomId = this.formValue.value.classroomId;

    const allocationExists = this.allAllocatedClassroom$.pipe(
      map((allocations) =>
        allocations.some(
          (allocation) =>
            allocation.teacherId == this.formValue.value.teacherId &&
            allocation.classroomId == this.formValue.value.classroomId
        )
      )
    );
    allocationExists.subscribe((exists) => {
      if (exists) {
        //alert('This allocation already exists for the selected teacher and classroom.');
        this.toast.error({detail:"Error message",summary:"THIS ALLOCATION ALREADY EXISTS FOR THE SELECTED TEACHER AND CLASSROOM",duration:5000})
      } else {
        this.allocateClassroomService
          .createAllocateClassroom(this.allocateClasroomObj)
          .subscribe(
            (res) => {
              console.log('Added Sucess');
              //alert('ADD SUCESSFULL');
              this.toast.success({detail:"Sucess message",summary:"CLASSROOM ALLOCATED TO TEACHER SUCESSFULLY",duration:5000})
              //this.formValue.reset();
              this.getAllocatedClassroom();
            },
            (err) => {
              //alert('SOMTHING WENT WRONG');
              this.toast.error({detail:"Error message",summary:"CLASSROOM ALLOCATED TO TEACHER UN-SUCESSFULLY, TRY AGAIN LATER !!",duration:5000})
            }
          );
      }
    });
  }

  deleteAllocatedClassroom(row: any) {
    this.allocateClassroomService
      .deleteAllocatedClassroom(row.allocateClassroomID)
      .subscribe((res) => {
        console.log('Deleted Sucess');
        //alert('DELETE SUCESSFULL');
        this.toast.success({detail:"Sucess message",summary:"ALLOCATION DELETED SUCESSFULLY",duration:5000})
        this.getAllocatedClassroom();
      });
  }
}
