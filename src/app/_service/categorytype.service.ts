import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryType } from '../_model/categoryType';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class CategorytypeService {

  url: string = `${HOST}/categoriesType`;
  constructor(private http: HttpClient) {
  }

  listCategoryType() {
    return this.http.get<CategoryType[]>(this.url);
  }
}
