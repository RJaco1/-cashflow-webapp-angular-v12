import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Transaction } from '../_model/transaction';
import { TransactionReport } from '../_model/transactionReport';
import { HOST, TOKEN_NAME } from '../_shared/var.constant';
import { jwtDecode } from 'jwt-decode';
import { ICurrenUser } from '../_shared/currentUserInterface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  readonly url: string = `${HOST}/user-transactions`;

  transactionChange = new Subject<Transaction[]>();
  messageChange = new Subject<string>();

  constructor(private http: HttpClient) { }

  getUserTransactions(p: number, s: number) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const { user_name }: ICurrenUser = jwtDecode(access_token);
    return this.http.get<Transaction[]>(`${this.url}/users/${user_name}/transactions?page=${p}&size=${s}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listTransactionbyCategoryType(id: number, p: number, s: number) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const { user_name }: ICurrenUser = jwtDecode(access_token);
    return this.http.get(`${this.url}/users/${user_name}/category-type/${id}/transactions?page=${p}&size=${s}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  addUserTransaction(transaction: Transaction) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const { user_id, user_name }: ICurrenUser = jwtDecode(access_token);
    transaction.userId = user_id;
    transaction.username = user_name;
    return this.http.post(this.url, transaction, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  updateTransaction(transaction: Transaction) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const { user_id, user_name }: ICurrenUser = jwtDecode(access_token);
    transaction.userId = user_id;
    transaction.username = user_name;
    return this.http.put(this.url, transaction, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  deleteTransaction(id: number) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  transactionReport() {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    const { user_name }: ICurrenUser = jwtDecode(access_token);
    return this.http.get<TransactionReport[]>(`${this.url}/users/${user_name}/transactions-report`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  generateReport() {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.get(`${this.url}/generateReport`, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
