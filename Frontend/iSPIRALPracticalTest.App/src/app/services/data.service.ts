import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.interface';
import { ConfigurationService } from './configuration.service';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, skip } from 'rxjs';
import { BaseService } from './base.service';
import { CreatePaymentDto } from '../models/create-payment.dto';
@Injectable({
  providedIn: 'root',
})
export class DataService extends BaseService{
  payments: Array<Payment> = [
    {
      payment_id: 1,
      customer_id: 1,
      order_id: 1,
      payment_date: '10/9/2021',
      payment_amount: 512.81,
      payment_method: 'credit card',
      payment_status: 'completed',
      currency: 'HKD',
    },
    {
      payment_id: 2,
      customer_id: 2,
      order_id: 2,
      payment_date: '2/23/2020',
      payment_amount: 181.98,
      payment_method: 'debit card',
      payment_status: 'pending',
      currency: 'CNY',
    },
    {
      payment_id: 3,
      customer_id: 3,
      order_id: 3,
      payment_date: '2/22/2022',
      payment_amount: 887.65,
      payment_method: 'PayPal',
      payment_status: 'completed',
      currency: 'CNY',
    },
    {
      payment_id: 4,
      customer_id: 4,
      order_id: 4,
      payment_date: '1/24/2021',
      payment_amount: 871.58,
      payment_method: 'debit card',
      payment_status: 'failed',
      currency: 'NOK',
    },
    {
      payment_id: 5,
      customer_id: 5,
      order_id: 5,
      payment_date: '12/21/2021',
      payment_amount: 463.85,
      payment_method: 'debit card',
      payment_status: 'pending',
      currency: 'CNY',
    },
    {
      payment_id: 6,
      customer_id: 6,
      order_id: 6,
      payment_date: '3/24/2022',
      payment_amount: 117.86,
      payment_method: 'credit card',
      payment_status: 'pending',
      currency: 'BRL',
    },
    {
      payment_id: 7,
      customer_id: 7,
      order_id: 7,
      payment_date: '8/29/2020',
      payment_amount: 195.2,
      payment_method: 'debit card',
      payment_status: 'pending',
      currency: 'EUR',
    },
    {
      payment_id: 8,
      customer_id: 8,
      order_id: 8,
      payment_date: '12/14/2020',
      payment_amount: 997.58,
      payment_method: 'PayPal',
      payment_status: 'pending',
      currency: 'CNY',
    },
    {
      payment_id: 9,
      customer_id: 9,
      order_id: 9,
      payment_date: '6/7/2021',
      payment_amount: 595.52,
      payment_method: 'credit card',
      payment_status: 'failed',
      currency: 'CNY',
    },
    {
      payment_id: 10,
      customer_id: 10,
      order_id: 10,
      payment_date: '10/4/2020',
      payment_amount: 788.05,
      payment_method: 'PayPal',
      payment_status: 'pending',
      currency: 'PEN',
    },
    {
      payment_id: 11,
      customer_id: 11,
      order_id: 11,
      payment_date: '2/26/2021',
      payment_amount: 985.21,
      payment_method: 'credit card',
      payment_status: 'pending',
      currency: 'XCD',
    },
    {
      payment_id: 12,
      customer_id: 12,
      order_id: 12,
      payment_date: '3/8/2020',
      payment_amount: 690.66,
      payment_method: 'debit card',
      payment_status: 'failed',
      currency: 'IDR',
    },
    {
      payment_id: 13,
      customer_id: 13,
      order_id: 13,
      payment_date: '10/30/2020',
      payment_amount: 100.06,
      payment_method: 'PayPal',
      payment_status: 'completed',
      currency: 'YER',
    },
    {
      payment_id: 14,
      customer_id: 14,
      order_id: 14,
      payment_date: '11/19/2020',
      payment_amount: 789.21,
      payment_method: 'credit card',
      payment_status: 'completed',
      currency: 'EUR',
    },
    {
      payment_id: 15,
      customer_id: 15,
      order_id: 15,
      payment_date: '5/17/2022',
      payment_amount: 969.51,
      payment_method: 'debit card',
      payment_status: 'completed',
      currency: 'USD',
    },
    {
      payment_id: 16,
      customer_id: 16,
      order_id: 16,
      payment_date: '10/29/2020',
      payment_amount: 364.94,
      payment_method: 'debit card',
      payment_status: 'failed',
      currency: 'RUB',
    },
    {
      payment_id: 17,
      customer_id: 17,
      order_id: 17,
      payment_date: '4/7/2021',
      payment_amount: 15.85,
      payment_method: 'credit card',
      payment_status: 'pending',
      currency: 'CAD',
    },
    {
      payment_id: 18,
      customer_id: 18,
      order_id: 18,
      payment_date: '5/15/2020',
      payment_amount: 692.58,
      payment_method: 'PayPal',
      payment_status: 'completed',
      currency: 'RUB',
    },
    {
      payment_id: 19,
      customer_id: 19,
      order_id: 19,
      payment_date: '8/28/2022',
      payment_amount: 413.08,
      payment_method: 'credit card',
      payment_status: 'completed',
      currency: 'PEN',
    },
    {
      payment_id: 20,
      customer_id: 20,
      order_id: 20,
      payment_date: '2/21/2022',
      payment_amount: 483.07,
      payment_method: 'debit card',
      payment_status: 'completed',
      currency: 'EUR',
    },
    {
      payment_id: 21,
      customer_id: 21,
      order_id: 21,
      payment_date: '5/12/2021',
      payment_amount: 497.44,
      payment_method: 'credit card',
      payment_status: 'pending',
      currency: 'EUR',
    },
    {
      payment_id: 22,
      customer_id: 22,
      order_id: 22,
      payment_date: '5/6/2020',
      payment_amount: 636.54,
      payment_method: 'PayPal',
      payment_status: 'pending',
      currency: 'BOB',
    },
    {
      payment_id: 23,
      customer_id: 23,
      order_id: 23,
      payment_date: '7/4/2020',
      payment_amount: 299.25,
      payment_method: 'debit card',
      payment_status: 'completed',
      currency: 'CNY',
    },
    {
      payment_id: 24,
      customer_id: 24,
      order_id: 24,
      payment_date: '1/6/2021',
      payment_amount: 795.12,
      payment_method: 'debit card',
      payment_status: 'pending',
      currency: 'HNL',
    },
    {
      payment_id: 25,
      customer_id: 25,
      order_id: 25,
      payment_date: '7/10/2021',
      payment_amount: 151.81,
      payment_method: 'credit card',
      payment_status: 'completed',
      currency: 'IDR',
    },
    {
      payment_id: 26,
      customer_id: 26,
      order_id: 26,
      payment_date: '3/15/2020',
      payment_amount: 521.07,
      payment_method: 'debit card',
      payment_status: 'pending',
      currency: 'IDR',
    },
    {
      payment_id: 27,
      customer_id: 27,
      order_id: 27,
      payment_date: '3/12/2021',
      payment_amount: 942.28,
      payment_method: 'debit card',
      payment_status: 'failed',
      currency: 'CNY',
    },
    {
      payment_id: 28,
      customer_id: 28,
      order_id: 28,
      payment_date: '1/5/2020',
      payment_amount: 264.1,
      payment_method: 'debit card',
      payment_status: 'failed',
      currency: 'SEK',
    },
    {
      payment_id: 29,
      customer_id: 29,
      order_id: 29,
      payment_date: '3/25/2022',
      payment_amount: 512.32,
      payment_method: 'debit card',
      payment_status: 'completed',
      currency: 'VND',
    },
    {
      payment_id: 30,
      customer_id: 30,
      order_id: 30,
      payment_date: '3/15/2020',
      payment_amount: 671.33,
      payment_method: 'debit card',
      payment_status: 'completed',
      currency: 'IDR',
    },
    {
      payment_id: 31,
      customer_id: 31,
      order_id: 31,
      payment_date: '3/28/2021',
      payment_amount: 683.59,
      payment_method: 'debit card',
      payment_status: 'completed',
      currency: 'RUB',
    },
    {
      payment_id: 32,
      customer_id: 32,
      order_id: 32,
      payment_date: '1/20/2020',
      payment_amount: 885.28,
      payment_method: 'credit card',
      payment_status: 'failed',
      currency: 'CNY',
    },
    {
      payment_id: 33,
      customer_id: 33,
      order_id: 33,
      payment_date: '9/10/2020',
      payment_amount: 30.14,
      payment_method: 'credit card',
      payment_status: 'failed',
      currency: 'TJS',
    },
    {
      payment_id: 34,
      customer_id: 34,
      order_id: 34,
      payment_date: '2/28/2022',
      payment_amount: 325.02,
      payment_method: 'credit card',
      payment_status: 'pending',
      currency: 'IRR',
    },
    {
      payment_id: 35,
      customer_id: 35,
      order_id: 35,
      payment_date: '5/7/2021',
      payment_amount: 959.51,
      payment_method: 'credit card',
      payment_status: 'pending',
      currency: 'AZN',
    },
    {
      payment_id: 36,
      customer_id: 36,
      order_id: 36,
      payment_date: '12/9/2021',
      payment_amount: 553.91,
      payment_method: 'credit card',
      payment_status: 'failed',
      currency: 'NZD',
    },
    {
      payment_id: 37,
      customer_id: 37,
      order_id: 37,
      payment_date: '4/26/2020',
      payment_amount: 856.46,
      payment_method: 'PayPal',
      payment_status: 'failed',
      currency: 'SEK',
    },
    {
      payment_id: 38,
      customer_id: 38,
      order_id: 38,
      payment_date: '2/6/2022',
      payment_amount: 754.62,
      payment_method: 'credit card',
      payment_status: 'failed',
      currency: 'PLN',
    },
    {
      payment_id: 39,
      customer_id: 39,
      order_id: 39,
      payment_date: '10/6/2021',
      payment_amount: 671.98,
      payment_method: 'credit card',
      payment_status: 'completed',
      currency: 'BRL',
    },
    {
      payment_id: 40,
      customer_id: 40,
      order_id: 40,
      payment_date: '6/18/2021',
      payment_amount: 774.15,
      payment_method: 'PayPal',
      payment_status: 'completed',
      currency: 'CZK',
    },
    {
      payment_id: 41,
      customer_id: 41,
      order_id: 41,
      payment_date: '8/22/2020',
      payment_amount: 782.37,
      payment_method: 'PayPal',
      payment_status: 'completed',
      currency: 'JPY',
    },
    {
      payment_id: 42,
      customer_id: 42,
      order_id: 42,
      payment_date: '10/20/2022',
      payment_amount: 955.85,
      payment_method: 'debit card',
      payment_status: 'pending',
      currency: 'THB',
    },
    {
      payment_id: 43,
      customer_id: 43,
      order_id: 43,
      payment_date: '10/19/2021',
      payment_amount: 781.47,
      payment_method: 'credit card',
      payment_status: 'failed',
      currency: 'IDR',
    },
    {
      payment_id: 44,
      customer_id: 44,
      order_id: 44,
      payment_date: '10/25/2020',
      payment_amount: 837.28,
      payment_method: 'credit card',
      payment_status: 'completed',
      currency: 'CNY',
    },
    {
      payment_id: 45,
      customer_id: 45,
      order_id: 45,
      payment_date: '2/27/2022',
      payment_amount: 73.97,
      payment_method: 'debit card',
      payment_status: 'completed',
      currency: 'CNY',
    },
    {
      payment_id: 46,
      customer_id: 46,
      order_id: 46,
      payment_date: '12/22/2022',
      payment_amount: 258.96,
      payment_method: 'debit card',
      payment_status: 'completed',
      currency: 'PHP',
    },
    {
      payment_id: 47,
      customer_id: 47,
      order_id: 47,
      payment_date: '10/5/2022',
      payment_amount: 426.7,
      payment_method: 'PayPal',
      payment_status: 'failed',
      currency: 'EUR',
    },
    {
      payment_id: 48,
      customer_id: 48,
      order_id: 48,
      payment_date: '8/23/2021',
      payment_amount: 455.85,
      payment_method: 'debit card',
      payment_status: 'pending',
      currency: 'CNY',
    },
    {
      payment_id: 49,
      customer_id: 49,
      order_id: 49,
      payment_date: '9/28/2022',
      payment_amount: 372.56,
      payment_method: 'debit card',
      payment_status: 'pending',
      currency: 'SEK',
    },
    {
      payment_id: 50,
      customer_id: 50,
      order_id: 50,
      payment_date: '12/26/2021',
      payment_amount: 639.92,
      payment_method: 'PayPal',
      payment_status: 'pending',
      currency: 'IDR',
    },
  ];

  constructor(
    private readonly http: HttpClient,
    private readonly configuration: ConfigurationService) {
    super();
  }


  getPayments(): Observable<Payment[]> {
    const result = new BehaviorSubject<Payment[]>([new Payment()]);

     this.http.get<Payment[]>(
        `${this.configuration.webApi.payments.baseUrl}`,
        this.httpOptions)
        .pipe(catchError(this.catchError))
        .subscribe((entityResponse: any) => {
          result.next(entityResponse.responseObject);
      });
      return result.asObservable().pipe(skip(1));
}
  getPayment(id: number): Observable<Payment> {
    const result = new BehaviorSubject<Payment>(new Payment());

    this.http.get<Payment>(
       `${this.configuration.webApi.payments.baseUrl}/${id}`,
       this.httpOptions)
       .pipe(catchError(this.catchError))
       .subscribe((entityResponse: any) => {
         result.next(entityResponse.responseObject);
     });
     return result.asObservable().pipe(skip(1));
  }
  createPayment(entity: CreatePaymentDto): Observable<Payment> {
    const result = new BehaviorSubject<Payment>(new Payment());

    this.http.post<Payment>(
       `${this.configuration.webApi.payments.baseUrl}`,
       entity,
       this.httpOptions)
       .pipe(catchError(this.catchError))
       .subscribe((entityResponse: any) => {
         result.next(entityResponse.responseObject);
     });
     return result.asObservable().pipe(skip(1));
  }
  updatePayment(entity: Payment): Observable<Payment> {
    const result = new BehaviorSubject<Payment>(new Payment());

    this.http.patch<Payment>(
       `${this.configuration.webApi.payments.baseUrl}`,
       entity,
       this.httpOptions)
       .pipe(catchError(this.catchError))
       .subscribe((entityResponse: any) => {
         result.next(entityResponse.responseObject);
     });
     return result.asObservable().pipe(skip(1));
  }
}
