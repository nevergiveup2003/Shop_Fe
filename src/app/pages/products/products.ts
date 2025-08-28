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
import { TableComponent } from '../../components/table/table';
import { ProductForm } from './product-form/product-form';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../services/category';
@Component({
  selector: 'app-products',
  imports: [TableComponent, MatButtonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  productService = inject(ProductService);
  categoriesService = inject(CategoryService)
  products: IProduct[] = [];
  categories: ICategory[] = [];
 showCols = ['id', 'name', 'description', 'price','categoryName', 'actions'];
  getCategoryName(id: number): string {
    return this.categories.find((c) => c.id === id)?.name ?? '';
  }
  getLatestCategories() {
    this.categoriesService.getCategory().subscribe((result) => {
      this.categories = result;
    });
  }

  ngOnInit() {
    this.getLatestCategories(); // <-- load categories thêm ở đây
    this.getLatestData();
  }
  getLatestData() {
    this.productService.getProducts().subscribe((result) => {
      // Map data để thêm categoryName cho mỗi product
      this.products = result.map(product => ({
        ...product,
        categoryName: this.getCategoryName(product.categoryId)
      }));
      console.log(this.products);
    });
  }

  edit(product: IProduct) {
    let ref = this.dialog.open(ProductForm, {
      panelClass: 'm-auto',
      data:{
       productId : product.id,
      }
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.getLatestData();
      }
    });
  }
  delete(product: IProduct) {
    this.productService.deleteProduct(product.id).subscribe(()=>{
      alert ("Delete successful");
      this.getLatestData();
    })
  }
  add() {
    this.openDialog();
  }
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    let ref = this.dialog.open(ProductForm, {
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
