import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { TransactionService } from 'src/app/_service/transaction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  chart: any;
  typeChart!: string;

  constructor(private transactionService: TransactionService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.typeChart = 'line';
    this.drawing();
  }

  drawing() {
    this.transactionService.transactionReport().subscribe(data => {
      let expense = data.map(res => res.expense);
      let income = data.map(res => res.income);
      let date = data.map(res => res.date);

      this.chart = new Chart('canvas', {
        type: this.typeChart as ChartType,
        data: {
          labels: date,
          datasets: [
            {
              label: 'Income',
              data: income,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Expense',
              data: expense,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            }
          ]
        }
      });
    });
  }

}
