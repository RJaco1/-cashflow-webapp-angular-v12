import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/_model/transaction';
import { TransactionService } from 'src/app/_service/transaction.service';
import { TransactionDeleteComponent } from './transaction-delete/transaction-delete.component';
import { TransactionUpdateComponent } from './transaction-update/transaction-update.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  displayedColumns = ["transactionId", "amount", "category", "categoryType", "date", "actions"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  transaction!: Transaction;
  show: boolean = false;
  totalEntries!: number;
  catType!: number;

  constructor(private transactionService: TransactionService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.transactionService.transactionChange.subscribe(data => {
      let transaction = JSON.parse(JSON.stringify(data)).content;
      this.totalEntries = JSON.parse(JSON.stringify(data)).totalElements;

      this.show = transaction.length != 0;

      const newData = transaction.map((e: { date: string; }) => {
        let d = this.dateConverter(e.date);
        return { ...e, date: d };
      });

      this.dataSource = new MatTableDataSource(newData);
      this.dataSource.sort = this.sort;
    });

    this.transactionService.messageChange.subscribe(data => {
      this.snackBar.open(data, 'notification', { duration: 2500 });
    });
    this.listAllTransactions();
  }

  listAllTransactions() {
    this.transactionService.listTransaction(0, 5).subscribe(data => {
      let transaction = JSON.parse(JSON.stringify(data)).content;
      this.totalEntries = JSON.parse(JSON.stringify(data)).totalElements;

      this.show = transaction.length != 0;

      const newData = transaction.map((e: { date: string; }) => {
        let d = this.dateConverter(e.date);
        return { ...e, date: d };
      });
      this.dataSource = new MatTableDataSource(newData);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dateConverter(date: string) {
    let d = new Date(date);
    let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    let month = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth();
    return `${d.getFullYear()}-${month}-${day}`;
  }

  openDialog(transaction: Transaction) {
    let tr = transaction != null ? transaction : new Transaction();
    this.dialog.open(TransactionUpdateComponent, {
      width: '250px',
      disableClose: true,
      data: tr
    });
  }

  openDeleteDialog(transaction: Transaction) {
    this.dialog.open(TransactionDeleteComponent, {
      width: '250px',
      disableClose: true,
      data: transaction
    });
  }

  pageable(e: any) {
    if (this.catType > 0) {
      this.transactionService.listTransactionbyCategoryType(this.catType, e.pageIndex, e.pageSize).subscribe(data => {
        let transaction = JSON.parse(JSON.stringify(data)).content;
        this.totalEntries = JSON.parse(JSON.stringify(data)).totalElements;

        this.show = transaction.length != 0;

        const newData = transaction.map((e: { date: string; }) => {
          let d = this.dateConverter(e.date);
          return { ...e, date: d };
        });
        this.dataSource = new MatTableDataSource(newData);
        this.dataSource.sort = this.sort;
      });
    } else {
      this.transactionService.listTransaction(e.pageIndex, e.pageSize).subscribe(data => {

        let transaction = JSON.parse(JSON.stringify(data)).content;
        this.totalEntries = JSON.parse(JSON.stringify(data)).totalElements;

        this.show = transaction.length != 0;

        const newData = transaction.map((e: { date: string; }) => {
          let d = this.dateConverter(e.date);
          return { ...e, date: d };
        });
        this.dataSource = new MatTableDataSource(newData);
        this.dataSource.sort = this.sort;
      });
    }
  }

  transacionTypeSelected() {
    if (this.catType > 0) {
      this.transactionService.listTransactionbyCategoryType(this.catType, 0, 5).subscribe(data => {
        let transaction = JSON.parse(JSON.stringify(data)).content;
        this.totalEntries = JSON.parse(JSON.stringify(data)).totalElements;

        this.show = transaction.length != 0;

        const newData = transaction.map((e: { date: string; }) => {
          let d = this.dateConverter(e.date);
          return { ...e, date: d };
        });
        this.dataSource = new MatTableDataSource(newData);
        this.dataSource.sort = this.sort;
      });
    } else {
      this.listAllTransactions();
    }
  }
}
