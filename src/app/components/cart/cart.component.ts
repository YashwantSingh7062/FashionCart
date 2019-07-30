import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommunicationService } from '../../services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = [];
  totalPrice ;
  constructor(
    private communication : CommunicationService,
    private httpService : HttpService,
    private router : Router
    ) { }

  ngOnInit() {
    this.products = this.communication.getTheProduct();

    for(let total of this.products){
      this.totalPrice += total.price;
      console.log(this.totalPrice);
    }

  }

  placeOrder(){
    this.router.navigate(['payments']);

  }

  removeItemFormCart(product){
    this.products = this.communication.removeItemFromCart(product);
  }
}
