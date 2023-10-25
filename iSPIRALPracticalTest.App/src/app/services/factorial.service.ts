import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, catchError, skip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactorialService  extends BaseService{
  constructor(
    private readonly http: HttpClient,
    private readonly configuration: ConfigurationService) {
    super();
  }

  compute(value:number): Observable<number> {
    const result = new BehaviorSubject<number>(0);

     this.http.get<number>(
        `${this.configuration.webApi.factorialComputation.compute}/${value}`,
        this.httpOptions)
        .pipe(catchError(this.catchError))
        .subscribe((entityResponse: any) => {
          result.next(entityResponse.responseObject);
      });
      return result.asObservable().pipe(skip(1));
}
}
