import { Carrito } from "./carrito";

export interface Checkout {
    carrito:Carrito;
    medioDePago:string ;
    idUsuario:string;
}