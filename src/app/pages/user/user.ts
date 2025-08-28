import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user';
import { IUser } from '../../Types/user';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserForm } from './user-form/user-form';

@Component({
  selector: 'app-user',
  imports: [TableComponent, MatButtonModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  userService = inject(UserService);
  users: IUser[] = [];
  constructor() {}
  showCols = ['id', 'name', 'email', 'phone', 'actions'];
  getLatestData() {
    this.userService.getUser().subscribe((result) => {
      this.users = result;
      console.log(this.users);
    });
  }
  ngOnInit() {
    this.getLatestData();
  }
  edit(user: IUser) {
    let ref = this.dialog.open(UserForm, {
      panelClass: 'm-auto',
      data:{
        userId: user.id,
      }
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.getLatestData();
      }
    });
  }
  delete(user: IUser) {
    this.userService.deleteUser(user.id).subscribe(()=>{
      alert ("Delete successful");
      this.getLatestData();
    })
  }
  add() {
    this.openDialog();
  }
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    let ref = this.dialog.open(UserForm, {
      panelClass: 'm-auto',
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        // chỉ reload khi form submit thành công
        this.getLatestData();
      }
    });
  }
}
