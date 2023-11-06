import { Product } from "./product"

interface ProductoDTO{
    cantidad:number,
    precioTotal:number,
    producto:Product
}

export interface ComprasDTO {
    nroCompra:string,
    fechaCompra:string,
    monto:number,
    productos: ProductoDTO[] 
}