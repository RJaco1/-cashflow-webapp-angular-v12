import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/_model/category';
import { CategoryType } from 'src/app/_model/categoryType';
import { CategoryService } from 'src/app/_service/category.service';
import { CategorytypeService } from 'src/app/_service/categorytype.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {


  category!: Category;
  categorytype: CategoryType[] = [];
  catetypeSelected!: CategoryType;
  updateData: boolean = true;

  constructor(private dialogRef: MatDialogRef<CategoryUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category, private categoryService: CategoryService,
    private categorytypeService: CategorytypeService) {
  }

  ngOnInit(): void {
    this.category = new Category();
    this.updateData = this.data != null && this.data.categoryId > 0;
    this.category.categoryId = this.data.categoryId;
    this.category.categoryName = this.data.categoryName;
    this.catetypeSelected = this.data.categorytype;
    this.listCatType();
  }

  listCatType() {
    this.categorytypeService.listCategoryType().subscribe(catTypeData => {
      this.categorytype = catTypeData;
    });
  }

  saveCategory() {
    let c = new Category();
    c.categoryId = this.category.categoryId;
    c.categoryName = this.category.categoryName;
    c.categorytype = this.catetypeSelected;
    if (this.updateData) {
      this.categoryService.updateCategory(c).subscribe(data => {
        this.categoryService.listCategory().subscribe(cat => {
          this.categoryService.categoryChange.next(cat);
          this.categoryService.messageChange.next('category updated');
        });
      });
    } else {
      this.categoryService.addCategory(c).subscribe(data => {
        this.categoryService.listCategory().subscribe(cat => {
          this.categoryService.categoryChange.next(cat);
          this.categoryService.messageChange.next('category added');
        });
      });
    }
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  disabledButton() {
    return (this.catetypeSelected == null || this.category.categoryName == null)
  }

}
