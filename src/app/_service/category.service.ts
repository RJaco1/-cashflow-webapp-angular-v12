import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../_model/category';
import { HOST, TOKEN_NAME } from '../_shared/var.constant';
import { jwtDecode } from 'jwt-decode';
import { ICurrenUser } from '../_shared/currentUserInterface'

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  readonly url: string = `${HOST}/user-categories`;

  categoryChange = new Subject<Category[]>();
  messageChange = new Subject<string>();

  constructor(private http: HttpClient) { }

  getUserCategories() {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const {user_name}: ICurrenUser = jwtDecode(access_token);
    return this.http.get<Category[]>(`${this.url}/users/${user_name}/categories`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  findUserCategoroesbyCategoryType(id: number) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const {user_name}: ICurrenUser = jwtDecode(access_token);
    return this.http.get<Category[]>(`${this.url}/users/${user_name}/category-type/${id}/categories`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  addUserCategory(category: Category) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const {user_id, user_name}: ICurrenUser = jwtDecode(access_token);
    category.userId = user_id;
    category.username = user_name;
    return this.http.post(this.url, category, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  updateUserCategory(category: Category) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const {user_id, user_name}: ICurrenUser = jwtDecode(access_token);
    category.userId = user_id;
    category.username = user_name;
    return this.http.put(this.url, category, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  deleteUserCategory(id: number) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const {user_name}: ICurrenUser = jwtDecode(access_token);
    return this.http.delete(`${this.url}/users/${user_name}/categories/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
