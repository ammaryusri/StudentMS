import { Component } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  //std: Student[] = [];
  std$!: Observable<any[]>;
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  StudentObj: Student = new Student();
  classRoomNameMap: Map<number, string> = new Map();
  allClassrooms: any = [];

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private classroomService: ClassroomService,
    private datePipe: DatePipe,
    private toast: NgToastService
  ) {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      dateOfBirth: [null, Validators.required],
      age: [0, Validators.required],
      classroomId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getStudents();
  }

  clickAddStudent() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getStudents() {
    this.std$ = this.studentService.getStudents();

    this.classroomService.getClassrooms().subscribe((res) => {
      this.allClassrooms = res;
      for (let i = 0; i < this.allClassrooms.length; i++) {
        if (this.allClassrooms[i].classroomId !== undefined) {
          this.classRoomNameMap.set(
            this.allClassrooms[i].classroomId,
            this.allClassrooms[i].classroomName
          );
        }
      }
    });
  }

  postStudewntsDetails() {
    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      return;
    }
    this.StudentObj.firstName = this.formValue.value.firstName;
    this.StudentObj.lastName = this.formValue.value.lastName;
    this.StudentObj.contactPerson = this.formValue.value.contactPerson;
    this.StudentObj.contactNo = this.formValue.value.contactNo;
    this.StudentObj.emailAddress = this.formValue.value.emailAddress;
    this.StudentObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.StudentObj.age = this.formValue.value.age;
    this.StudentObj.classroomId = this.formValue.value.classroomId;

    this.studentService.createStudents(this.StudentObj).subscribe(
      (res) => {
        console.log('Added Sucess');
        //alert('ADD SUCESSFULL');
        this.toast.success({detail:"Sucess message",summary:"STUDENT ADDED SUCESSFULLY",duration:5000})
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getStudents();
      },
      (err) => {
        //alert('SOMTHING WENT WRONG....');
        this.toast.error({detail:"Error message",summary:"STUDENT ADDED UN-SUCESSFULLY, TRY AGAIN LATER !!",duration:5000})
      }
    );
  }

  onEdit(row: any) {
    console.log('Row object:', row);
    this.showAdd = false;
    this.showUpdate = true;
    this.StudentObj.studentId = row.studentId;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['contactPerson'].setValue(row.contactPerson);
    this.formValue.controls['contactNo'].setValue(row.contactNo);
    this.formValue.controls['emailAddress'].setValue(row.emailAddress);
    this.formValue.controls['dateOfBirth'].setValue(
      this.datePipe.transform(new Date(row.dateOfBirth), 'yyyy-MM-dd')
    );
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['classroomId'].setValue(row.classroomId);
  }

  updateStudent() {
    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      return;
    }
    this.StudentObj.firstName = this.formValue.value.firstName;
    this.StudentObj.lastName = this.formValue.value.lastName;
    this.StudentObj.contactPerson = this.formValue.value.contactPerson;
    this.StudentObj.contactNo = this.formValue.value.contactNo;
    this.StudentObj.emailAddress = this.formValue.value.emailAddress;
    this.StudentObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.StudentObj.age = this.formValue.value.age;
    this.StudentObj.classroomId = this.formValue.value.classroomId;
    this.studentService.updateStudents(this.StudentObj).subscribe((res) => {
      console.log('Updated Sucess');
      //alert('UPDATED SUCESSFULL');
      this.toast.success({detail:"Sucess message",summary:"STUDENT UPDATED SUCESSFULLY",duration:5000})
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getStudents();
    });
    this.StudentObj.studentId = 0;
  }

  deleteStudent(row: any) {
    this.studentService.deleteStudents(row.studentId).subscribe((res) => {
      console.log('Deleted Sucess');
      //alert('DELETE SUCESSFULL');
      this.toast.success({detail:"Sucess message",summary:"STUDENT DELETED SUCESSFULLY",duration:5000})
      this.getStudents();
    });
  }

  calculateAge() {
    const ageControl = this.formValue.get('age');
    if (ageControl) {
      const dateOfBirthControl = this.formValue.get('dateOfBirth');
      if (dateOfBirthControl && dateOfBirthControl.value) {
        const dateOfBirth = dateOfBirthControl.value;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        ageControl.setValue(age);
      }
    }
  }
}
