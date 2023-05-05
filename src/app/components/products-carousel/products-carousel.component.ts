import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.css']
})
export class ProductsCarouselComponent {
  slides = [
    { img: 'https://via.placeholder.com/600.png/09f/fff' },
    { img: 'https://via.placeholder.com/600.png/021/fff' },
    { img: 'https://via.placeholder.com/600.png/321/fff' },
    { img: 'https://via.placeholder.com/600.png/422/fff' },
    { img: 'https://via.placeholder.com/600.png/654/fff' },
  ];
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
  constructor() {}
 
  ngOnInit(): void {}
}
