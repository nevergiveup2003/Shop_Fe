import { Component, inject } from '@angular/core';
import { IProduct } from '../../Types/product';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Category } from '../category/category';
import { ICategory } from '../../Types/categories';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
@Component({
  selector: 'app-products',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule,CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  productService = inject(ProductService);
  products: IProduct[] = [];
  categories: ICategory[] = [];
  isOpenForm = false;
  getCategoryName(id: number): string {
    return this.categories.find((c) => c.id === id)?.name ?? '';
  }
  getLatestCategories() {
    this.productService.getProducts().subscribe((result) => {
      this.categories = result;
    });
  }

  ngOnInit() {
    this.getLatestData();
    this.getLatestCategories(); // <-- load categories thêm ở đây
  }
  getLatestData() {
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
      console.log(this.products);
    });
  }

  productName!: string;
  productPrice!: number;
  productDescription!: string;
  productCategoryId!: number;
  addProduct() {
    console.log(this.productName);
    this.productService
      .addProduct(
        this.productName,
        this.productDescription,
        this.productPrice,
        this.productCategoryId
      )
      .subscribe(() => {
        alert('added successfully');
        this.isOpenForm = false;
        this.getLatestData();
      });
  }
  editId = 0;
  editProduct(product: IProduct) {
    this.productName = product.name;
    this.productDescription = product.description;
    this.productPrice = product.price;
    this.productCategoryId = product.categoryId;
    this.isOpenForm = true;
    this.editId = product.id;
  }
  UpdateProduct() {
    this.productService
      .UpdateProduct(
        this.editId,
        this.productName,
        this.productDescription,
        this.productPrice,
        this.productCategoryId
      )
      .subscribe(() => {
        alert('Update successfully');
        this.isOpenForm = false;
        this.getLatestData();
        this.editId = 0;
      });
  }
  deleteProduct(id: number) {
    this.productService.DeleteProduct(id).subscribe(() => {
      alert('Delete successfully');
      this.getLatestData();
    });
  }
}
