import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ErrorMessageService } from './core/error-message/error-message.service';
import { catchError } from 'rxjs';

const API = '/api';
const {apiUrl} = environment

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.startsWith(API)) {
    req= req.clone({
      url: req.url.replace(API, apiUrl),
    });
  }

  const token = localStorage.getItem('X-Authorization');
  if (token) {
    req = req.clone({
      setHeaders: {
        'X-Authorization': token,
      },
    });
  }

  const errorMsgService = inject(ErrorMessageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        localStorage.removeItem('X-Authorization');
      } else {
        errorMsgService.setError(err);
        router.navigate(['/error'])
      }

      return [err];
    })
  )
};
