import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../_model/category';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = `${HOST}/categories`;

  categoryChange = new Subject<Category[]>();
  messageChange = new Subject<string>();

  constructor(private http: HttpClient) { }

  listCategory() {
    return this.http.get<Category[]>(this.url);
  }

  listCategorybyCategoryType(id: number) {
    return this.http.get<Category[]>(`${this.url}/${id}`);
  }

  addCategory(category: Category) {
    return this.http.post(this.url, category);
  }

  updateCategory(category: Category) {
    return this.http.put(this.url, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
