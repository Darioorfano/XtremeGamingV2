import { Component, OnInit } from '@angular/core';
import { ComprasDTO } from 'src/app/models/ComprasDTO';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  compras : ComprasDTO[] = [];
  constructor(private userService: UserService,private cartService:CartService){

}

ngOnInit(): void {
const usuario = this.userService.obtenerUsuarioDeLaSesion();

this.cartService.obtenerMisCompras(usuario.uid).subscribe((data)=>{
this.compras = data.compras;
});
}


}
