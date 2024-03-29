import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {
  userForm: FormGroup;
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermidiate',
    'Graduate',
    'Post Graduate'
  ]
  constructor(
    private _fb: FormBuilder
  ) {
    this.userForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }

  onFormSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
    }
  }
}
