import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { PRODUCT_ID_URL, PRODUCT_SEARCH_URL, PRODUCT_URL } from '../utility/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


constructor(private httpClient:HttpClient) { }

getAllProducts() : Observable <Product[]>{
  return this.httpClient.get<Product[]>(PRODUCT_URL);
}

getProductById(id :string |null): Observable <Product>{

  return this.httpClient.get<Product>(PRODUCT_ID_URL + id);
}

getProductsByName(name: string) : Observable<Product[]>{
  return this.httpClient.get<Product[]>(PRODUCT_SEARCH_URL + name);
}

}
