import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../services/category';
import { ICategory } from '../../Types/categories';
import { TableComponent } from '../../components/table/table';
import { CategoryForm } from './category-form/category-form';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  imports: [MatButtonModule, TableComponent],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  categoryService = inject(CategoryService);
  constructor() {}
  categories: ICategory[] = [];
  showCols = ['id', 'name', 'description','actions'];

  getLatestData() {
    this.categoryService.getCategory().subscribe((result) => {
      this.categories = result;
      console.log(this.categories);
    });
  }
  ngOnInit(){
    this.getLatestData();
  }
  edit(category:ICategory){
    let ref = this.dialog.open(CategoryForm,{
      panelClass:'m-auto',
      data:{
        categoryId:category.id,
      }
    });
    ref.afterClosed().subscribe((result) => {
      if(result){
        this.getLatestData();
      }
    })
  }
  delete(category:ICategory){
    this.categoryService.deleteCategory(category.id).subscribe(()=>{
      alert("delete successful");
      this.getLatestData();
    })
  }
  add(){
    this.openDialog();
  }
  readonly dialog = inject(MatDialog);
  openDialog():void{
    let ref = this.dialog.open(CategoryForm,{
      panelClass:'m-auto',
    });
    ref.afterClosed().subscribe((result) =>{
      if(result){
        this.getLatestData();
      }
    })
  }
}
