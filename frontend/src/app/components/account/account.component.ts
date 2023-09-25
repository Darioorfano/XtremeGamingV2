import { Component, OnInit } from '@angular/core';
import { ComprasDTO } from 'src/app/models/ComprasDTO';
import { Usuario } from 'src/app/models/usuario';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  compras : ComprasDTO[] = [];
  usuario : Usuario = null
  constructor(private userService: UserService,private cartService:CartService){

}

ngOnInit(): void {
this.usuario = this.userService.obtenerUsuarioDeLaSesion();

this.cartService.obtenerMisCompras(this.usuario.uid).subscribe((data)=>{
this.compras = data.compras;
});
}


}
