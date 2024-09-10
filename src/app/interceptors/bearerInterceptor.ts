/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable()
export class bearerInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthServiceService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const obj: { [key: string]: any } = this._authService.getData();
    if (obj['token']) {
      req = req.clone({
        setHeaders: {
          authorization: obj['token'] || '',
          requestedby: obj['email'],
        },
      });
    }
    return next.handle(req);
  }
}
