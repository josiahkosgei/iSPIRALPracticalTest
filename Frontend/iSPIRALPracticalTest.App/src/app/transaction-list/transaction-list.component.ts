import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Payment } from '../models/payment.interface';
import { FactorialService } from '../services/factorial.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent   implements OnInit  {

  payments= new Array<Payment>();
  selectedPayment: any;

  constructor(public dataService: DataService,
    public factorialService: FactorialService) { }

  ngOnInit() {
    this.dataService.getPayments().subscribe(data=>{
      this.payments=data
    });
  }
  public selectPayment(contact: any){
    this.selectedPayment = contact;
  }
  public computeFactorial(payment_id: number){
    return this.factorialService.compute(payment_id).subscribe(data=>{
      let span = document.getElementById(`factorial-result-${payment_id}`) as HTMLElement ;
      span.innerText = data.toString();
    });
  }
}
