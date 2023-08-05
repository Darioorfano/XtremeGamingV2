import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent{
@Input () product!: Product ;
  
  constructor(
    public cartService:CartService) {
    
  }

  agregarCarrito(product : Product){
    console.log("producto",product)
    this.cartService.addToCart(product);
  }
 

}


