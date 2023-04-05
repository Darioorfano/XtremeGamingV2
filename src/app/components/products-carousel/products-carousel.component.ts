import { Component } from '@angular/core';

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

  constructor() {}
 
  ngOnInit(): void {}
}
