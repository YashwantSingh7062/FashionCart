import { Component, OnInit, Input } from '@angular/core';
import { CommunicationService } from '../../../services/communication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product
  constructor(private communication : CommunicationService) { }

  ngOnInit() {
  }

  addToCart(){
    this.communication.updateToCart(this.product);
  }
}
