import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.interface';
import { ConfigurationService } from './configuration.service';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, skip } from 'rxjs';
import { BaseService } from './base.service';
import { CreatePaymentDto } from '../models/create-payment.dto';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class DataService extends BaseService{


  constructor(
    private readonly http: HttpClient,
    private toastr: ToastrService,
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
        this.toastr.success(entityResponse.message);
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
        this.toastr.success(entityResponse.message);
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
        this.toastr.success(entityResponse.message);
         result.next(entityResponse.responseObject);
     });
     return result.asObservable().pipe(skip(1));
  }
}
