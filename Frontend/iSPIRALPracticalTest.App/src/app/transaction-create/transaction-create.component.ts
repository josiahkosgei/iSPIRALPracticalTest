import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Payment } from '../models/payment.interface';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreatePaymentDto } from '../models/create-payment.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss'],
})
export class TransactionCreateComponent implements OnInit {
  payment: Payment = {
    payment_id: 0,
    customer_id: 0,
    order_id: 0,
    payment_date: '',
    payment_amount: 0,
    payment_method: '',
    payment_status: '',
    currency: '',
  };

  paymentMethods = ['credit card', 'debit card', 'PayPal'];
  orders = [
    { id: 1, name: 'Order #1' },
    { id: 2, name: 'Order #2' },
    { id: 3, name: 'Order #3' },
  ];
  currencies = [
    { currency_code: 'EUR', currency_name: 'Euro' },
    { currency_code: 'RUB', currency_name: 'Ruble' },
    { currency_code: 'MNT', currency_name: 'Tugrik' },
    { currency_code: 'CNY', currency_name: 'Yuan Renminbi' },
  ];

  paymentForm = this.formBuilder.group({
    order_id: new FormControl(0, Validators.required),
    payment_amount: new FormControl(0, Validators.required),
    payment_method: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required)
  });
  constructor(
    public dataService: DataService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}
  get f() { return this.paymentForm.controls; }

  createPayment() {
    console.log(this.payment);
    this.dataService.createPayment(this.payment);
    this.payment = new Payment();
  }
  onSubmit(): void {
    if (this.paymentForm.valid) {
    // Process checkout data here
    console.warn('Your order has been submitted', this.paymentForm.value);
    const createPaymentDto: CreatePaymentDto = {
      currency: this.paymentForm.value.currency as string,
      customer_id: 1,
      order_id: Number(this.paymentForm.value.order_id),
      payment_amount:Number(this.paymentForm.value.payment_amount),
      payment_method: this.paymentForm.value.payment_method as string,
    };
    this.dataService.createPayment(createPaymentDto);
    this.paymentForm.reset();
  }else{

    this.toastr.error('All fields required');
  }
  }
}
