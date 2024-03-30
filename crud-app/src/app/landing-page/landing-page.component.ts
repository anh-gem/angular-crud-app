import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SharedService } from '../services/shared.service';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  displayedColumns: string[] = 
  ['id',
  'firstName', 
  'lastName', 
  'email',
  'dob',
  'gender', 
  'education', 
  'company', 
  'experience',
  'package',
  'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  constructor(
    private _userService: UserService, 
    private _sharedService: SharedService, 
    private _dialog:MatDialog,
    private _coreService:CoreService,
    ) { }
  ngOnInit(): void {
    this.getUserList();

     // Subscribe to userListUpdate$ to listen for updates
     this._sharedService.userListUpdate$.subscribe(() => {
      this.getUserList();
    });
  }

  getUserList() {
    this._userService.getAllUsers().subscribe({
      next: (val:any) => {
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     },
     error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (val) => {
        this.getUserList();
        let confirmation = confirm("Are you sure you want to delete this user?")
        if(confirmation){
          console.log("User Deleted.")
        }
     },
     error: console.log,
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditComponent, {
      data,// Pass data to the dialog for editing
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._sharedService.triggerUserListUpdate(); // Trigger the userListUpdate$
      }
    });
  }
}
