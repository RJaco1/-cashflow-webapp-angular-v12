import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Transaction } from '../_model/transaction';
import { TransactionReport } from '../_model/transactionReport';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  url: string = `${HOST}/transactions`;

  transactionChange = new Subject<Transaction[]>();
  messageChange = new Subject<string>();

  constructor(private http: HttpClient) { }

  listTransaction(p: number, s: number) {
    return this.http.get<Transaction[]>(`${this.url}?page=${p}&size=${s}`);
  }

  listTransactionbyCategoryType(id: number, p: number, s: number) {
    return this.http.get(`${this.url}/${id}?page=${p}&size=${s}`);
  }

  addTransaction(transaction: Transaction) {
    return this.http.post(this.url, transaction);
  }

  updateTransaction(transaction: Transaction) {
    return this.http.put(this.url, transaction);
  }

  deleteTransaction(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  transactionReport(){
    return this.http.get<TransactionReport[]>(`${this.url}/transactionReport`);
  }

}
