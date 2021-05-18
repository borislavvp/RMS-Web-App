import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { from, Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.authService.User)
          .pipe(
              switchMap(user => {
                  if (user) {
                      request = request.clone({
                          setHeaders: {
                              Authorization: `Bearer ${user.access_token}`
                          }
                      });
                  }
                  return next.handle(request);
              })
            );
    }
}