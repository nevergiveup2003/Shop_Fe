import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user';
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    CommonModule,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  fb = inject(FormBuilder);
  @Input() userId!: number;
  userService = inject(UserService);
  userForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    gender: [1, Validators.required],
    dateOfBirth: ['', Validators.required],
  });
  dialogRef = inject(MatDialogRef<UserForm>);
  data = inject<UserForm>(MAT_DIALOG_DATA);
  ngOnInit() {
    if (this.data.userId) {
      // load user data and patch to form
      this.userService.getUserById(this.data?.userId).subscribe((result) => {
        console.log(result);
        this.userForm.patchValue(result as any);
        this.userForm.get('gender')?.disable();
        this.userForm.get('dateOfBirth')?.disable();

      });
    } else {
    }
  }
  onSubmit() {
  if (this.userForm.invalid) return;

  let value: any = this.userForm.value;

  if (this.data?.userId) {
    // Update user
    this.userService.updateUser(value).subscribe(() => {
      alert('User Updated Successfully');
      this.dialogRef.close(true);
    });
  } else {
    // Add user
    this.userService.addUser(value).subscribe(() => {
      alert('User Added Successfully');
      this.dialogRef.close(true);
    });
  }
}

}
