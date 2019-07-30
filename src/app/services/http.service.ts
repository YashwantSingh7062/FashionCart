import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  //Product Requests
  getProducts() : Observable<any>{
    return this.http.get<any>("/api/products")
              .pipe(catchError(this.errorHandler));
  }

  saveItem(product){
    return this.http.post<Product>("/api/products",product)
          .pipe(catchError(this.errorHandler));
  }

  //UserRequests
  loginUser(userData){
    return this.http.post<any>("/api/user/login",userData)
            .pipe(catchError(this.errorHandler));
  }

  signupUser(userData){
    return this.http.post<User>("/api/user/signup",userData)
            .pipe(catchError(this.errorHandler));
  }

  getUser(){
    return this.http.get<any>("/api/user")
            .pipe(catchError(this.errorHandler));
  }
  updateUser(data){
    return this.http.put<any>("/api/user",data)
                .pipe(catchError(this.errorHandler));
  }
  deactivateAccount(){
    return this.http.get<any>("/api/user/deactivate")
              .pipe(catchError(this.errorHandler));
  }

  //Order Request
  placeOrder(products){
    return this.http.post<any>("/api/order",products)
                .pipe(catchError(this.errorHandler));
  }
  getOrders(){
    return this.http.get<any>("/api/order")
            .pipe(catchError(this.errorHandler));
  }
  //Error Handler
  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Server Error !!");
  }

  //Token Request
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
