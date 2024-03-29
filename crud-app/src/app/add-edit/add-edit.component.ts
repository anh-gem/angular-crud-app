import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';

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
  constructor(private _fb: FormBuilder, private _userService:UserService, private _dialogref:DialogRef<AddEditComponent>) {
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
      this._userService.addUser(this.userForm.value).subscribe({
        next: (val:any) => {
           alert('User added successfully');
           this._dialogref.close();
        },
        error: (err:any)=>{
           console.log(err);
        }
      });
    }
  }
}
