import { CarritoItem } from "./carritoItem";

export interface Carrito {
 listaProductos : CarritoItem[];
 usuarioId :string;
 cantidadItems : number;
 precioTotal: number


}