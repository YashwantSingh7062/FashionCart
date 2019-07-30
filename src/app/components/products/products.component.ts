import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  response = {
    message : null,
    count : null,
    products : []
  };
  error;
  saveProducts = {
    name : null,
    brand : null,
    price : null,
    image : null
  }
  constructor(private httpService : HttpService) { }

  ngOnInit() {
    this.httpService.getProducts()
        .subscribe(data => {
                  this.response.message = data.message,
                  this.response.count = data.count,
                  this.response.products = data.products
        },
                    err => this.error = err)
  }

  fileSelected(event){
    this.saveProducts.image = event.target.files[0];
  }

  saveItem(){
    let formData = new FormData();
    formData.append("name",this.saveProducts.name);
    formData.append("brand",this.saveProducts.brand);
    formData.append("price",this.saveProducts.price);
    formData.append("image",this.saveProducts.image);

    this.httpService.saveItem(formData)
        .subscribe(data => console.log(data),
                  err => console.log(err));
  }
}
