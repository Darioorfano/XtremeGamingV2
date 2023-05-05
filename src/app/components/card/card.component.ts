import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  habilitarVerMas :boolean = false;

  constructor(private router :Router) {
   }

  ngOnInit() {
    this.habilitarVerMas;
    this.router.url == '/productos' ? this.habilitarVerMas = true : this.habilitarVerMas;

   }

}


