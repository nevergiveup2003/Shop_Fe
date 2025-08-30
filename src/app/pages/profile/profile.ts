import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  profileForm!: FormGroup;

  ngOnInit() {
    // Khởi tạo form
    this.profileForm = this.fb.group({
      email: [],
      name: [],
      phone: [],
      password: [],
      profileImage: [],
    });

    // Lấy dữ liệu profile từ API và set vào form
    this.authService.getProfile().subscribe((result:any) => {
      console.log(result);
      this.profileForm.patchValue(result);
      this.imageSrc = result.profileImage;
    });
  }

  onUpdate() {
    this.authService
      .updateProfile(this.profileForm.value)
      .subscribe((result) => {
        alert('Update successfully!');
      });
  }
  imageSrc!:string;
  fileUpload(event: Event) {
    var target: any = event.target;
    if(target.files && target.files[0]){
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload =  ()=>{
        this.imageSrc = reader.result as string;
        this.profileForm.patchValue({
          profileImage:this.imageSrc
        })
      }
      reader.readAsDataURL(file)
    }
  }
}
