import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  products = [];
  creditCard = this.FB.group({
    cardNumber : ['',[Validators.minLength(12)]],
    cvv : [],
    expiry : []
  })
  errors ; 
  constructor(private communication : CommunicationService,
    private httpService : HttpService
    ,private router : Router,
    private FB : FormBuilder) { }

  ngOnInit() {
    this.products = this.communication.getTheProduct();
  }

  get cardNumber(){
    return this.creditCard.get('cardNumber');
  }

  placeOrder(){
    let cardValue = this.cardNumber.value;
    if(!cardValue){
      this.errors = "All details are required";
      return false;
    }
    else if(cardValue.toString().length != 12){
      this.errors = "Enter a 12 digit valid card number";
      return false;
    }
    else{
      this.errors = "";
    }
    let productIds = this.products.map((product) => {return product._id});
    this.httpService.placeOrder({productIds})
        .subscribe(data => {
          this.communication.emptyCart();
          this.router.navigate(['orders']);
        },
        err => {
            this.router.navigate(['login']);
        });

  }

}
