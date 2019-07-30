import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private httpService : HttpService) { }

  intercept(req,next){
    let headers = new HttpHeaders({
      Authorization : `Bearer ${this.httpService.getToken()}`
    }) 
    let tokenizedRequest = req.clone({
      headers
    })
    return next.handle(tokenizedRequest);
  }
}
