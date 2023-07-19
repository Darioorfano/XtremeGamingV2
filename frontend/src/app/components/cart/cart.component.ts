import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/models/carrito';
import { CarritoItem } from 'src/app/models/carritoItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carrito! : Carrito 

  constructor(public cartService: CartService){

  }
ngOnInit(): void {
  this.carrito ={
    listaProductos : [],
    usuarioId :'',
    cantidadItems : 0,
    precioTotal: 0
  }
}
  removeFromCart(cartProduct:CarritoItem){
    this.cartService.removeFromCart(cartProduct.producto.id);
    }
  
    changeQuantity(cartProduct:CarritoItem, quantityS:string){
      const quantity = parseInt(quantityS);
      this.cartService.changeQuantity(cartProduct.producto.id,quantity);
    }
  
    decrementQuantity(cartProduct:CarritoItem) : void {
      this.cartService.decrementQuantity(cartProduct.producto.id);
    }
  
    incrementQuantity(cartProduct:CarritoItem) : void {
      this.cartService.incrementQuantity(cartProduct.producto.id);
    }
  
    onQuantityChange(cartProduct:CarritoItem) {
      let productInCart= this.carrito.listaProductos
        .find(items => items.producto.id === cartProduct.producto.id);
      if(!productInCart)
        return;
    }
  
    getTotalFromProductsInCart(){
      return this.cartService.getTotalFromProductsInCart();
    }
  
    getTotalCost(){
      return this.cartService.getTotalCost();
    }
  
    getTotalProductCost(cartProduct:CarritoItem){
      return this.cartService.getProductTotalCost(cartProduct);
    }
}
