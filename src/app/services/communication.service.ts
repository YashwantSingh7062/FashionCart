import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  products = [];
  communication = new Subject();
  communication$ = this.communication.asObservable();

  constructor() { }

  getLoginData(value){
    this.communication.next(value);
  }

  updateToCart(productUpdate){
    this.products = this.products.filter((product) => {
        if(product == productUpdate){
          alert('Product already exist in the cart');
        }
        return product != productUpdate
    });
    this.products.push(productUpdate);
  }

  getTheProduct(){
    return this.products;
  }

  removeItemFromCart(productFilter){
    this.products = this.products.filter((product) => product != productFilter);
    return this.products;
  }

  emptyCart(){
    this.products = [];
  }
}
