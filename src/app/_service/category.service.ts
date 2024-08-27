import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../_model/category';
import { HOST, TOKEN_NAME } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = `${HOST}/categories`;

  categoryChange = new Subject<Category[]>();
  messageChange = new Subject<string>();

  constructor(private http: HttpClient) { }

  listCategory() {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.get<Category[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listCategorybyCategoryType(id: number) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.get<Category[]>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  addCategory(category: Category) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.post(this.url, category, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  updateCategory(category: Category) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.put(this.url, category, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  deleteCategory(id: number) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
