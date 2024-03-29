import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrls: ['./card-products.component.css']
})
export class CardProductsComponent implements OnInit {
  products: Product[] = []

constructor(public productService:ProductService, public cartService:CartService){

}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((response) =>{
    this.products=response;
    });

  }
  agregarCarrito(product : Product){
    console.log("producto",product)
    this.cartService.addToCart(product);
  }

}
