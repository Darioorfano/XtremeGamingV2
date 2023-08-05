import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.css']
})
export class ProductsCarouselComponent {
products:Product[] = [];

  customOptions: OwlOptions = {
    autoplay: true,
    margin: 0,
    items: 4,
    navText:["<button type='button' role='presentation'class='owl-prev'><span aria-label='Prev'>‹</span></button>",
    "<button type='button' role='presentation'class='owl-next'><span aria-label='Next'>›</span></button>"],
    nav:false,
    responsive: {
      0: {
        items: 1,
        dots: true,
      },
      480: {
        margin: 80,
        items:1,
        dots: false,
        nav: true,
      },
      768: {
        items: 2,
        nav:true
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
        nav:true
      },
    }
  }
  constructor(private productServices:ProductService) {}
 
  ngOnInit(){
    this.productServices.getAllProducts().subscribe((response) => {
      this.products = response;
      console.log(this.products)
    })
 
}
}