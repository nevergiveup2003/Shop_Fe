import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
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
import { CategoryService } from '../../../services/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-form',
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
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm {
  fb = inject(FormBuilder);
  @Input() categoryId!: number;
  categoryService = inject(CategoryService);
  categoryForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });
  dialogRef = inject(MatDialogRef<CategoryForm>);
  data = inject(MAT_DIALOG_DATA) 

  ngOnInit() {
    if (this.data?.categoryId) {
      this.categoryService
        .getCategoryById(this.data.categoryId)
        .subscribe((result) => {
          this.categoryForm.patchValue(result as any);
        });
    }else{}
  }
  onSubmit(){
    if(this.categoryForm.invalid) return;
    let value : any = this.categoryForm.value;
    if(this.data?.categoryId){
      this.categoryService.updateCategory(value).subscribe(()=>{
        alert("Category update successful");
        this.dialogRef.close(true);
      });
    }else{
      this.categoryService.addCategory(value).subscribe(()=>{
        alert('Category Add Successfully')
      })
    }
  }
}
