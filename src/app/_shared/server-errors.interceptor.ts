import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { tap, catchError, retry } from 'rxjs/operators'
import { RETRIES } from "./var.constant";

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(retry(RETRIES)).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }
                }
            })
        ).pipe(catchError((err) => {
            console.log(err);
            if (err.status === 400) {
                this.snackBar.open(err.error.message, 'ERROR 400', { duration: 5000 });
            } else if (err.status === 401) {
                this.snackBar.open(err.error.message, 'ERROR 401', { duration: 5000 });
                //this.router.navigate['/login'];
            } else if (err.status === 500) {
                this.snackBar.open(err.error.message, 'ERROR 500', { duration: 5000 });
            } else {
                this.snackBar.open(err.error.message, 'ERROR', { duration: 5000 });
            } return EMPTY
        }));
    }
}