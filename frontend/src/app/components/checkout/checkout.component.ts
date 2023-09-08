import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoItem } from 'src/app/models/carritoItem';
import { Checkout } from 'src/app/models/checkout';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    private userServices: UserService,
    private cartService: CartService,
    private router: Router
    
  ) {}

  clearCart(){
    this.cartService.getCart().listaProductos.forEach(item => {
     this.removeFromCart(item);
    })
     }
   
     removeFromCart(cartProduct:CarritoItem){
       this.cartService.removeFromCart(cartProduct.producto.id);
       }

  confirmarCompra() {
    const usuario = this.userServices.obtenerUsuarioDeLaSesion();
    const carrito = this.cartService.getCartFromLocalStorage();
    const newCheckout: Checkout = {
      idUsuario: usuario?.uid,
      carrito: carrito,
      medioDePago: 'Tarjeta de credito',
    };

    this.cartService.buyCart(newCheckout).subscribe(
      (data) => {
        Swal.fire('Su compra ha sido realizada con exito', data, 'success').then((result)=>{
          if(result.isConfirmed){
           this.clearCart();
           this.router.navigateByUrl("/mi-cuenta");
          }
         });
      },
      (error) => {
        if (error.status == 500) {
          Swal.fire(
            'Error al realizar la compra',
            error.error.mensaje,
            'error'
          );
        } else {
          Swal.fire(
            'Se ha producido un error, por favor intente mas tarde',
            'error'
          );
        }
      }
    );
  }
}
