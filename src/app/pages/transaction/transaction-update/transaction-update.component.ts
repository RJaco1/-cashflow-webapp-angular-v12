import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/_model/account';
import { Category } from 'src/app/_model/category';
import { Currency } from 'src/app/_model/currency';
import { Transaction } from 'src/app/_model/transaction';
import { CategoryService } from 'src/app/_service/category.service';
import { TransactionService } from 'src/app/_service/transaction.service';

@Component({
  selector: 'app-transaction-update',
  templateUrl: './transaction-update.component.html',
  styleUrls: ['./transaction-update.component.css']
})
export class TransactionUpdateComponent implements OnInit {

  transaction!: Transaction;
  category: Category[] = [];
  catSelected!: Category;
  selectedDate!: Date;
  updateData: boolean = true;
  currency!: Currency;
  account!: Account;
  catType: number = 1;

  constructor(private categoryService: CategoryService, private dialogRef: MatDialogRef<TransactionUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Transaction,
    private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transaction = new Transaction();
    this.currency = new Currency();
    this.account = new Account();
    this.updateData = this.data != null && this.data.transactionId > 0;
    this.transaction.transactionId = this.data.transactionId;
    this.transaction.amount = this.data.amount;
    this.selectedDate = this.dateConverter(this.data.date);
    this.transaction.date = this.data.date;
    this.catSelected = this.data.category;
    this.transaction.category = this.data.category;
    this.transaction.currency = this.data.currency;
    this.transaction.account = this.data.account;
    this.listCat();
    this.currency.currencyId = 1;
    this.currency.currency = "$";
    this.account.accountId = 1;
    this.account.accountName = "Personal";
  }

  listCat() {
    this.categoryService.listCategorybyCategoryType(this.catType).subscribe(data => {
      this.category = data;
    });
  }

  saveTransaction() {
    let t = new Transaction();
    t.transactionId = this.transaction.transactionId;
    t.amount = this.transaction.amount;
    t.date = this.selectedDate.toISOString();
    t.category = this.catSelected;
    if (this.updateData) {
      t.currency = this.transaction.currency;
      t.account = this.transaction.account;
      this.transactionService.updateTransaction(t).subscribe(data => {
        this.transactionService.listTransaction(0, 5).subscribe(d => {
          this.transactionService.transactionChange.next(d);
          this.transactionService.messageChange.next('transaction updated');
        });
      });
    } else {
      t.currency = this.currency;
      t.account = this.account;
      this.transactionService.addTransaction(t).subscribe(data => {
        this.transactionService.listTransaction(0, 5).subscribe(d => {
          this.transactionService.transactionChange.next(d);
          this.transactionService.messageChange.next('transaction added');
        });
      });
    }
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  dateConverter(date: string) {
    return date != null ? new Date(date.replace(/-/g, '\/')) : date;
  }

  disabledButton() {
    return (this.catSelected == null || this.transaction.amount == null || this.selectedDate == null);
  }

}
