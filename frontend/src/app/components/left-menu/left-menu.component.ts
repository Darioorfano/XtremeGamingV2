import { Component } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {
  categories = [
    { texto: 'Notebooks' },
    { texto: 'Componentes de pc' },
    { texto: 'Monitores y Televisores' },
    { texto: 'Periféricos' }
  ];
}
