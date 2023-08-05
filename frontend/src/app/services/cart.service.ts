import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { CarritoItem } from '../models/carritoItem';
import { CARTBUY_URL } from '../utility/constant';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cart:Carrito = this.getCartFromLocalStorage();

  constructor(
    private _snackBar: MatSnackBar,
    public httpClient:HttpClient
  ) { }

  addToCart(product: Product):void {
    console.log(this.cart)
    let productInCart= this.cart.listaProductos
      .find(item => item.producto.id === product.id);
    if(productInCart) {
      this._snackBar.open('¡El Producto ya esta en el carro!', 'Ok', {duration: 3000});
      return;
    }
    const carritoItem  : CarritoItem = {
      producto : product,
      cantidad: 1,
      precioTotal: product.precio
    }

    this.cart.listaProductos.push(carritoItem);
    this.setCartToLocalStorage();
    this._snackBar.open('¡Producto agregado al carrito!', 'Ok', { duration: 3000 });
  }

  removeFromCart(productId: string):void{
    this.cart.listaProductos = this.cart.listaProductos
      .filter(item => item.producto.id != productId);
    this.setCartToLocalStorage();
    this._snackBar.open('Producto eliminado del carrito.', 'Ok', {
      duration: 3000,
    });
  }

  changeQuantity(productId: string, quantity: number):void{
    let productInCart= this.cart.listaProductos
      .find(items => items.producto.id === productId);
    if(!productInCart)
      return;

    productInCart.cantidad=quantity;
    productInCart.precioTotal=productInCart.producto.precio*quantity;
    this.setCartToLocalStorage();
  }

  decrementQuantity(productId: string) : void {
    let productInCart = this.cart.listaProductos.
    find(item => item.producto.id === productId);
    if (productInCart) {
      if (productInCart.cantidad > 1) {
        productInCart.cantidad--;
      }
    }
  }

  incrementQuantity(productId: string) : void {
    let productInCart = this.cart.listaProductos.
    find(item => item.producto.id === productId);
    if (productInCart) {
      if (productInCart.cantidad >= 1) {
        productInCart.cantidad++;
      }
    }
  }

  clearCart(){
   this.cart ={
    listaProductos : [],
    usuarioId :'',
    cantidadItems : 0,
    precioTotal: 0
  }
    this.setCartToLocalStorage();
  }

  getCart(): Carrito {
    return this.cart;
  }
  
  setCartToLocalStorage(): void {
    this.cart.precioTotal = this.cart.listaProductos
      .reduce((prevSum, currentProduct) => prevSum + currentProduct.producto.precio, 0);
    this.cart.cantidadItems = this.cart.listaProductos
      .reduce((prevSum, currentProduct) => prevSum + currentProduct.cantidad, 0);
  
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
  }
  

  getCartFromLocalStorage(): Carrito {
    const cartJson = localStorage.getItem('Cart');
    if(cartJson){
      return JSON.parse(cartJson)
    }
    const carrito : Carrito ={
      listaProductos : [],
      usuarioId :'',
      cantidadItems : 0,
      precioTotal: 0
    }
    return carrito
  }

  getTotalFromProductsInCart(): number {
    let subtotal = 0;
    this.cart.listaProductos.forEach(cartProduct => {
      subtotal += cartProduct.producto.precio * cartProduct.cantidad;
    });
    return subtotal;
  }

   getTotalCost(): number {
     let deliveryCost = 400;

     return this.getTotalFromProductsInCart()+deliveryCost;
   }

  getProductTotalCost(cartProduct: CarritoItem): number{
    let subtotal = 0;
    const item = this.cart.listaProductos.
    find(p => p.producto.id === cartProduct.producto.id);
    if (item) {
      subtotal=item.cantidad*item.producto.precio;
    }
    return subtotal;
  }

   buyCart() :Observable<any> {

    return this.httpClient.post<any>(CARTBUY_URL,this.cart);
  }
}

