import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Payment } from '../models/payment.interface';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent   implements OnInit  {

  payments= new Array<Payment>();
  selectedPayment: any;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPayments().subscribe(data=>{
      this.payments=data
    });
  }
  public selectPayment(contact: any){
    this.selectedPayment = contact;
  }
}
