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
    this.catSelected = new Category();
    this.updateData = this.data != null && this.data.transactionId > 0;
    this.transaction.transactionId = this.data.transactionId;
    this.transaction.amount = this.data.amount;
    this.selectedDate = this.dateConverter(this.data.date);
    this.transaction.date = this.data.date;
    this.catSelected.categoryId = this.data.categoryId;
    this.catSelected.categoryName = this.data.categoryName;
    this.transaction.categoryId = this.data.categoryId;
    this.transaction.categoryName = this.data.categoryName;
    this.transaction.currencyId = this.data.currencyId;
    this.transaction.currency = this.data.currency;
    this.transaction.accountId = this.data.accountId;
    this.transaction.accountName = this.data.accountName;
    this.listCat();
    this.currency.currencyId = 1;
    this.currency.currency = "$";
    this.account.accountId = 1;
    this.account.accountName = "Personal";
  }

  listCat() {
    this.categoryService.findUserCategoroesbyCategoryType(this.catType).subscribe(data => {
      this.category = data;
    });
  }

  saveTransaction() {
    let t = new Transaction();
    t.transactionId = this.transaction.transactionId;
    t.amount = this.transaction.amount;
    t.date = this.selectedDate.toISOString();
    t.categoryId = this.catSelected.categoryId;
    if (this.updateData) {
      t.currencyId = this.transaction.currencyId;
      t.currency = this.transaction.currency;
      t.accountId = this.transaction.accountId;
      t.accountName = this.transaction.accountName;
      this.transactionService.updateTransaction(t).subscribe(() => {
        this.transactionService.getUserTransactions(0, 5).subscribe(d => {
          this.transactionService.transactionChange.next(d);
          this.transactionService.messageChange.next('transaction updated');
        });
      });
    } else {
      t.currencyId = this.currency.currencyId;
      t.currency = this.currency.currency;
      t.accountId = this.account.accountId;
      t.accountName = this.account.accountName;
      this.transactionService.addUserTransaction(t).subscribe(() => {
        this.transactionService.getUserTransactions(0, 5).subscribe(d => {
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
