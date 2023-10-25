import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export class BaseService {
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };

    // Inner method that actually does the job.
    // Needed because we cannot rely on "this" here
    private static handleError(error: any, message: string): Observable<never> {
        console.log(error);
        return throwError(message);
    }

    catchError(error: any, parameter: any): Observable<never> {
        return BaseService.handleError(error, "Error");
    }

    catchErrorDetailed(error: any, message: string): Observable<never> {
        return BaseService.handleError(error, message);
    }
}
