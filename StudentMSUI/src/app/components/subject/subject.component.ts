import { Component } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent {
  subjects: Subject[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  subjectObj: Subject = new Subject();

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) {
    this.formValue = this.formBuilder.group({
      subjectName: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getSubject();
  }

  clickAddSubject() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getSubject() {
    this.subjectService
      .getSubjects()
      .subscribe((results: Subject[]) => (this.subjects = results));
  }

  postSubject() {
    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      return;
    }
    this.subjectObj.subjectName = this.formValue.value.subjectName;

    this.subjectService.createSubjects(this.subjectObj).subscribe(
      (res) => {
        console.log('Added Sucess');
        //alert('ADD SUCESSFULL');
        this.toast.success({detail:"Sucess message",summary:"SUBJECT ADDED SUCESSFULLY",duration:5000})
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getSubject();
      },
      (err) => {
        //alert('SOMTHING WENT WRONG....');
        this.toast.error({detail:"Error message",summary:"SUBJECT ADDED UN-SUCESSFULLY, TRY AGAIN LATER !!",duration:5000})
      }
    );
  }

  onEdit(row: any) {
    console.log('Row object:', row);
    this.showAdd = false;
    this.showUpdate = true;
    this.subjectObj.SubjectId = row.subjectId;
    this.formValue.controls['subjectName'].setValue(row.subjectName);
  }

  updateSubject() {
    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      return;
    }
    this.subjectObj.subjectName = this.formValue.value.subjectName;

    this.subjectService.updateSubjects(this.subjectObj).subscribe((res) => {
      console.log('Updated Sucess');
      //alert('UPDATED SUCESSFULL');
      this.toast.success({detail:"Sucess message",summary:"SUBJECT UPDATED SUCESSFULLY",duration:5000})
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getSubject();
    });
    this.subjectObj.SubjectId = 0;
  }

  deleteClassroom(row: any) {
    this.subjectService.deleteSubjects(row.subjectId).subscribe((res) => {
      console.log('Deleted Sucess');
      this.toast.success({detail:"Sucess message",summary:"SUBJECT DELETED SUCESSFULLY",duration:5000})
      //alert('DELETE SUCESSFULL');
      this.getSubject();
    });
  }
}
