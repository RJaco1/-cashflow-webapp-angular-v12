import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/_model/category';
import { CategoryService } from 'src/app/_service/category.service';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  displayedColumns = ["categoryId", "categoryName", "categoryType", "actions"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  category!: Category;
  show: boolean = false;
  catType!: number;

  constructor(private categoryService: CategoryService, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.categoryService.categoryChange.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.categoryService.messageChange.subscribe(data => {
      this.snackBar.open(data, 'Notification', { duration: 2500 });
    });

    this.listAllCategories();
  }

  listAllCategories() {
    this.categoryService.listCategory().subscribe(data => {
      this.show = data.length != 0;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  categoryTypeSelected() {
    if (this.catType > 0) {
      this.categoryService.listCategorybyCategoryType(this.catType).subscribe(data => {
        this.show = data.length != 0;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      this.listAllCategories();
    }
  }

  openDialog(category: Category) {
    let cat = category != null ? category : new Category();
    this.dialog.open(CategoryUpdateComponent, {
      width: '250px',
      disableClose: true,
      data: cat
    });
  }

  openDeleteDialog(category: Category) {
    this.dialog.open(CategoryDeleteComponent, {
      width: '250px',
      disableClose: true,
      data: category
    });
  }

}
