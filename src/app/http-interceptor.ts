import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, retry} from 'rxjs/operators';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const hardcodedToken = '1d38d128-0671-4121-8084-f6332a992a40';
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${hardcodedToken}`
      }
    });

    return next.handle(req)
      .pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          alert(`HTTP Error: ${req.url}`);
          return throwError(error);
        }),
        finalize(() => {
          const profilingMsg = `${req.method} "${req.urlWithParams}"`;
        })
        );
  }
}