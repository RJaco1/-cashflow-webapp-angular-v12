import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryType } from '../_model/categoryType';
import { HOST, TOKEN_NAME } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class CategorytypeService {

  url: string = `${HOST}/categoriesType`;
  constructor(private http: HttpClient) {
  }

  listCategoryType() {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.get<CategoryType[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
