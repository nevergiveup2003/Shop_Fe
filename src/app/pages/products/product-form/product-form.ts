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
import { ProductService } from '../../../services/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../../Types/categories';
import { CategoryService } from '../../../services/category';

@Component({
  selector: 'app-product-form',
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
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  fb = inject(FormBuilder);
  @Input() productId!: number;
  productService = inject(ProductService);
  categoryService = inject(CategoryService)
  categories:ICategory[] = [];
  productForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    categoryId: ['', Validators.required],
  });
  
  dialogRef = inject(MatDialogRef<ProductForm>);
  data = inject<ProductForm>(MAT_DIALOG_DATA);

constructor() {
    this.categoryService.getCategory().subscribe((result) => {
      this.categories = result;
    });
  }

  ngOnInit() {
    if (this.data?.productId) {
      // load user data and patch to form
      this.productService.getProductById(this.data.productId).subscribe((result) => {
        console.log(result);
        this.productForm.patchValue(result as any);
        

      });
    } else {
    }
  }
  onSubmit() {
  if (this.productForm.invalid) return;

  let value: any = this.productForm.value;

  if (this.data?.productId) {
    // Update user
    this.productService.updateProduct(value).subscribe(() => {
      alert('User Updated Successfully');
      this.dialogRef.close(true);
    });
  } else {
    // Add user
    this.productService.addProduct(value).subscribe(() => {
      alert('User Added Successfully');
      this.dialogRef.close(true);
    });
  }
}
}
