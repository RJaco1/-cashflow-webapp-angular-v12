import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryUpdateComponent } from './pages/category/category-update/category-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryDeleteComponent } from './pages/category/category-delete/category-delete.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { TransactionUpdateComponent } from './pages/transaction/transaction-update/transaction-update.component';
import { TransactionDeleteComponent } from './pages/transaction/transaction-delete/transaction-delete.component';
import { ReportComponent } from './pages/report/report.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryUpdateComponent,
    CategoryDeleteComponent,
    TransactionComponent,
    TransactionUpdateComponent,
    TransactionDeleteComponent,
    ReportComponent,
    HomeComponent,
    LoginComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
