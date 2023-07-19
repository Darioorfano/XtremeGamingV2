import { Injectable } from '@angular/core';
import { CartProduct } from '../models/cartProduct';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject : BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor(
    private _snackBar: MatSnackBar,
    public httpClient:HttpClient
  ) { }

  addToCart(product: Product):void {
    let productInCart= this.cart.items
      .find(items => items.product.id === product.id);
    if(productInCart) {
      this._snackBar.open('¡El Producto ya esta en el carro!', 'Ok', {duration: 3000});
      return;
    }
    this.cart.items.push(new CartProduct(product));
    this.setCartToLocalStorage();
    this._snackBar.open('¡Producto agregado al carrito!', 'Ok', { duration: 3000 });
  }

  removeFromCart(productId: number):void{
    this.cart.items = this.cart.items
      .filter(item => item.product.id != productId);
    this.setCartToLocalStorage();
    this._snackBar.open('Producto eliminado del carrito.', 'Ok', {
      duration: 3000,
    });
  }

  changeQuantity(productId: number, quantity: number):void{
    let productInCart= this.cart.items
      .find(items => items.product.id === productId);
    if(!productInCart)
      return;

    productInCart.quantity=quantity;
    productInCart.price=productInCart.product.precio*quantity;
    this.setCartToLocalStorage();
  }

  decrementQuantity(productId: number) : void {
    let productInCart = this.cart.items.
    find(items => items.product.id === productId);
    if (productInCart) {
      if (productInCart.quantity > 1) {
        productInCart.quantity--;
      }
    }
  }

  incrementQuantity(productId: number) : void {
    let productInCart = this.cart.items.
    find(items => items.product.id === productId);
    if (productInCart) {
      if (productInCart.quantity >= 1) {
        productInCart.quantity++;
      }
    }
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentProduct) => prevSum + currentProduct.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentProduct) => prevSum + currentProduct.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

  getTotalFromProductsInCart(): number {
    let subtotal = 0;
    this.cart.items.forEach(cartProduct => {
      subtotal += cartProduct.product.precio * cartProduct.quantity;
    });
    return subtotal;
  }

   getTotalCost(): number {
     let deliveryCost = 400;

     return this.getTotalFromProductsInCart()+deliveryCost;
   }

  getProductTotalCost(cartProduct: CartProduct): number{
    let subtotal = 0;
    const product = this.cart.items.
    find(p => p.product.id === cartProduct.product.id);
    if (product) {
      subtotal=product.quantity*product.price;
    }
    return subtotal;
  }

   logCart() :Observable<any> {
    return this.httpClient.post<any>(LOG_CART,this.cart);
  }
}