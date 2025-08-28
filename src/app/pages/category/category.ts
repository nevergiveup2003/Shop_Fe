import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../services/category';
import { ICategory } from '../../Types/categories';

@Component({
  selector: 'app-category',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})
export class Category {
 categoryService = inject(CategoryService)
 constructor(){}
 categories : ICategory[] = [];
  isOpenForm = false;
  
  getLatestData() {
    this.categoryService.getCategory().subscribe((result)=>{
      this.categories = result;
      console.log(this.categories);
    })
  }
  ngOnInit(){
    this.getLatestData();
  }
  categoryName!:string;
  categoryDescription!:string;
  addCategory(){
    this.categoryService.addCategory(this.categoryName,this.categoryDescription).subscribe(()=>{
      alert('added successfully');
      this.isOpenForm = false;
      this.getLatestData();
    })
  }
  editId = 0;
  editCategory(category:ICategory){
    this.categoryName = category.name;
    this.categoryDescription = category.description;
    this.isOpenForm = true;
    this.editId = category.id;
  }
  updateCategory(){
    this.categoryService.updateCategory(this.editId,this.categoryName,this.categoryDescription).subscribe(()=>{
      alert('Update successfully');
      this.isOpenForm = false;
      this.getLatestData();
      this.editId=0;
    })
  }
  deleteCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe(()=>{
      alert('Delete successfully');
      this.getLatestData();
    })
  }
}
