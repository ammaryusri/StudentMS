import { Component } from '@angular/core';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent {
  teachers: Teacher[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  TeacherObj: Teacher = new Teacher();

  constructor(
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    this.getTeachers();
  }
  clickAddTeacher() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getTeachers() {
    this.teacherService
      .getTeachers()
      .subscribe((results: Teacher[]) => (this.teachers = results));
  }

  postTeacherDetails() {
    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      return;
    }

    this.TeacherObj.firstName = this.formValue.value.firstName;
    this.TeacherObj.lastName = this.formValue.value.lastName;
    this.TeacherObj.contactNo = this.formValue.value.contactNo;
    this.TeacherObj.emailAddress = this.formValue.value.emailAddress;

    this.teacherService.createTeachers(this.TeacherObj).subscribe(
      (res) => {
        console.log('Added Sucess');
        //alert('ADD SUCESSFULL');
        this.toast.success({detail:"Sucess message",summary:"TEACHER ADDED SUCESSFULLY",duration:5000})
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getTeachers();
      },
      (err) => {
        //alert('SOMTHING WENT WRONG....');
        this.toast.error({detail:"Error message",summary:"TEACHER ADDED UN-SUCESSFULLY, TRY AGAIN LATER !!",duration:5000})
      }
    );
  }

  onEdit(row: any) {
    console.log('Row object:', row);
    this.showAdd = false;
    this.showUpdate = true;
    this.TeacherObj.TeacherId = row.teacherId;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['contactNo'].setValue(row.contactNo);
    this.formValue.controls['emailAddress'].setValue(row.emailAddress);
  }

  updateTeacher() {
    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      return;
    }
    this.TeacherObj.firstName = this.formValue.value.firstName;
    this.TeacherObj.lastName = this.formValue.value.lastName;
    this.TeacherObj.contactNo = this.formValue.value.contactNo;
    this.TeacherObj.emailAddress = this.formValue.value.emailAddress;
    this.teacherService.updateTeachers(this.TeacherObj).subscribe((res) => {
      console.log('Updated Sucess');
      //alert('UPDATED SUCESSFULL');
      this.toast.success({detail:"Sucess message",summary:"TEACHER UPDATED SUCESSFULLY",duration:5000})
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getTeachers();
    });
    this.TeacherObj.TeacherId = 0;
  }

  deleteTeacher(row: any) {
    this.teacherService.deleteTeacher(row.teacherId).subscribe((res) => {
      console.log('Deleted Sucess');
      //alert('DELETE SUCESSFULL');
      this.toast.success({detail:"Sucess message",summary:"TEACHER DELETED SUCESSFULLY",duration:5000})
      this.getTeachers();
    });
  }
}
