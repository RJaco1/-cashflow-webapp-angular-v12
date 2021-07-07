import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/_model/category';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  category!: Category;

  constructor(private dialogRef: MatDialogRef<CategoryDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.category = new Category();
    this.category.categoryId = this.data.categoryId;
    this.category.categoryName = this.data.categoryName;
    this.category.categorytype = this.data.categorytype;
  }

  deleteData() {
    console.log(this.category.categoryId);
    this.categoryService.deleteCategory(this.category.categoryId).subscribe(data => {
      this.categoryService.listCategory().subscribe(cat => {
        this.categoryService.categoryChange.next(cat);
        this.categoryService.messageChange.next('category removed');
      });
    });
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
