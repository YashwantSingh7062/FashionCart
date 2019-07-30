import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders = {
    orders : null
  };
  constructor(private httpService : HttpService,private router : Router) { }

  ngOnInit() {
    this.httpService.getOrders()
        .subscribe(data => this.orders = data,
                    err => {
                      localStorage.removeItem("token");
                      this.router.navigate(['login']);
                    });
  }

}
