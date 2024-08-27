import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Transaction } from '../_model/transaction';
import { TransactionReport } from '../_model/transactionReport';
import { HOST, TOKEN_NAME } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  url: string = `${HOST}/transactions`;

  transactionChange = new Subject<Transaction[]>();
  messageChange = new Subject<string>();

  constructor(private http: HttpClient) { }

  listTransaction(p: number, s: number) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.get<Transaction[]>(`${this.url}?page=${p}&size=${s}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listTransactionbyCategoryType(id: number, p: number, s: number) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.get(`${this.url}/${id}?page=${p}&size=${s}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  addTransaction(transaction: Transaction) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
    return this.http.post(this.url, transaction, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  updateTransaction(transaction: Transaction) {
    const access_token: string = JSON.parse(sessionStorage.getItem(TOKEN_NAME)!).access_token;
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
    return this.http.get<TransactionReport[]>(`${this.url}/transactionReport`, {
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
