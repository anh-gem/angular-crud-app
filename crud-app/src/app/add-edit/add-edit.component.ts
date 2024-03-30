import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {
  userForm: FormGroup;
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermidiate',
    'Graduate',
    'Post Graduate'
  ]
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogref: MatDialogRef<AddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject data for editing
    ) {
    this.userForm = this._fb.group({
      firstName: data?.user?.firstName || '',
      lastName: data?.user?.lastName || '',
      email: data?.user?.email || '',
      dob: data?.user?.dob || '',
      gender: data?.user?.gender || '',
      education: data?.user?.education || '',
      company: data?.user?.company || '',
      experience: data?.user?.experience || '',
      package: data?.user?.package || ''
    });
  }
  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onCancel() {
    console.log('Cancel button clicked');
    let confirmation = confirm("Do want to cancel?")
    if (confirmation == true) {
      this._dialogref.close();
    }
    else {
      console.log("So, you want to stay on this page")
    }
  }

  onFormSubmit() {
    // Check if any form fields are blank
    const emptyFields = Object.keys(this.userForm.controls).filter(key => {
      const control = this.userForm.get(key);
      return control && typeof control.value === 'string' && control.value.trim() === '';
    }); 

    if (emptyFields.length > 0) {
      alert('Please fill in all required fields.');
      return; // Stop form submission
    }
    if (this.userForm.valid) {
     if(this.data){
      this._userService.updateUser(this.data.id,this.userForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('User Updated!','done' )
          this._dialogref.close(true);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
     }
    else{
      this._userService.addUser(this.userForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('User Added!','done' )
          this._dialogref.close(true);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
    }
  }

}
