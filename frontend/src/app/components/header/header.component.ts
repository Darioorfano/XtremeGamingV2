import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/carrito';
import { Product } from 'src/app/models/product';
import { Usuario } from 'src/app/models/usuario';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit {
carrito! :Carrito
usuario: Usuario | null = null ;
loggedIn: boolean = false;
nombreDelProducto : string = ''
productosBuscados : Product[] = []


constructor(private userServices:UserService,
  private router:Router,
  public cartServices : CartService,
  public productServices:ProductService
  ){ }

ngOnInit() {
this.obtenerUsuario();
this.carrito=this.cartServices.getCartFromLocalStorage();
this.obtenerProductos();
}

obtenerUsuario(){
 this.usuario = this.userServices.obtenerUsuarioDeLaSesion();
  this.loggedIn = this.usuario !=null 
}

obtenerProductos() {  
  if(this.nombreDelProducto.length >=3){
    this.productServices
    .getProductsByName(this.nombreDelProducto)
    .subscribe((data) => {
      this.productosBuscados = data || [];
    });
  }else{
    this.productosBuscados = []
  }
}


borrarSesion(){
  this.userServices.borrarSesion();
  this.loggedIn=false;
  this.usuario=null;
  this.router.navigateByUrl('/')
}
}
