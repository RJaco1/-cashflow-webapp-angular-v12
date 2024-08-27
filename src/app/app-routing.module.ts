import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './pages/report/report.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './_service/guard.service';
import { NotFound404Component } from './pages/not-found404/not-found404.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [GuardService] },
  { path: 'categories', component: CategoryComponent, canActivate: [GuardService] },
  { path: 'transactions', component: TransactionComponent, canActivate: [GuardService] },
  { path: 'transactionReport', component: ReportComponent, canActivate: [GuardService] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFound404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
