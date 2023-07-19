import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit {

  usuario: Usuario | null = null ;
loggedIn: boolean = false;
  
constructor(private userServices:UserService,private router:Router){ }

ngOnInit() {
this.obtenerUsuario();
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
