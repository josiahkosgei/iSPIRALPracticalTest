import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Payment } from '../models/payment.interface';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {

  payment : Payment = {
    payment_id: 0,
    customer_id: 0,
    order_id: 0,
    payment_date: '',
    payment_amount: 0,
    payment_method: '',
    payment_status: '',
    currency: '',
  };
  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  createPayment(){
    console.log(this.payment);
    this.dataService.createPayment(this.payment);
    this.payment = new Payment();

  }
}
