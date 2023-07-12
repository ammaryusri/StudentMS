import { Component } from '@angular/core';
import { Classroom } from 'src/app/models/classroom';
import { ClassroomService } from 'src/app/services/classroom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
})
export class ClassroomComponent {
  classrooms: Classroom[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  ClassroomObj: Classroom = new Classroom();

  constructor(
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) {
    this.formValue = this.formBuilder.group({
      classroomName: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getClassrooms();
  }

  clickAddClassroom() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getClassrooms() {
    this.classroomService
      .getClassrooms()
      .subscribe((results: Classroom[]) => (this.classrooms = results));
  }

  postClassrooms() {
    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      return;
    }
    this.ClassroomObj.classroomName = this.formValue.value.classroomName;

    this.classroomService.createClassrooms(this.ClassroomObj).subscribe(
      (res) => {
        console.log('Added Sucess');
        //alert('ADD SUCESSFULL');
        this.toast.success({detail:"Sucess message",summary:"CLAASSROOM ADDED SUCESSFULLY",duration:5000})
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getClassrooms();
      },
      (err) => {
        this.toast.error({detail:"Error message",summary:"CLASSROOM ADDED UN-SUCESSFULLY, TRY AGAIN LATER !!",duration:5000})
       // alert('SOMTHING WENT WRONG....');
      }
    );
  }

  onEdit(row: any) {
    console.log('Row object:', row);
    this.showAdd = false;
    this.showUpdate = true;
    this.ClassroomObj.ClassroomId = row.classroomId;
    this.formValue.controls['classroomName'].setValue(row.classroomName);
  }

  updateClassroom() {
    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      return;
    }
    this.ClassroomObj.classroomName = this.formValue.value.classroomName;

    this.classroomService
      .updateClassrooms(this.ClassroomObj)
      .subscribe((res) => {
        console.log('Updated Sucess');
        //alert('UPDATED SUCESSFULL');
        this.toast.success({detail:"Sucess message",summary:"CLASSROOM UPDATED SUCESSFULLY",duration:5000})
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getClassrooms();
      });
    this.ClassroomObj.ClassroomId = 0;
  }

  deleteClassroom(row: any) {
    this.classroomService.deleteClassrooms(row.classroomId).subscribe((res) => {
      console.log('Deleted Sucess');
      //alert('DELETE SUCESSFULL');
      this.toast.success({detail:"Sucess message",summary:"CLASSROOM DELETED SUCESSFULLY",duration:5000})
      this.getClassrooms();
    });
  }
}
