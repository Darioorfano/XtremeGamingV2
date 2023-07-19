import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/carrito';
import { Usuario } from 'src/app/models/usuario';
import { CartService } from 'src/app/services/cart.service';
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

constructor(private userServices:UserService,
  private router:Router,
  public cartServices : CartService,
  ){ }

ngOnInit() {
this.obtenerUsuario();
this.carrito=this.cartServices.getCartFromLocalStorage();
}

obtenerUsuario(){
 this.usuario = this.userServices.obtenerUsuarioDeLaSesion();
console.log("Usuario header component",this.usuario)
  this.loggedIn = this.usuario !=null 
}

borrarSesion(){
  this.userServices.borrarSesion();
  this.loggedIn=false;
  this.usuario=null;
  this.router.navigateByUrl('/')
}
}
