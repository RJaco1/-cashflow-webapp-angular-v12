import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from 'src/app/_model/transaction';
import { TransactionService } from 'src/app/_service/transaction.service';

@Component({
  selector: 'app-transaction-delete',
  templateUrl: './transaction-delete.component.html',
  styleUrls: ['./transaction-delete.component.css']
})
export class TransactionDeleteComponent implements OnInit {

  transaction!: Transaction;

  constructor(private dialogRef: MatDialogRef<TransactionDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Transaction, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transaction = new Transaction();
    this.transaction.transactionId = this.data.transactionId;
    this.transaction.amount = this.data.amount;
    this.transaction.currency = this.data.currency;
    this.transaction.date = this.data.date;
    this.transaction.category = this.data.category;
    this.transaction.account = this.data.account;
  }

  deleteData() {
    this.transactionService.deleteTransaction(this.transaction.transactionId).subscribe(data => {
      this.transactionService.listTransaction(0, 5).subscribe(data => {
        this.transactionService.transactionChange.next(data);
        this.transactionService.messageChange.next('transaction removed');
      });
    });
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
